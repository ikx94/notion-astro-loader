import type {
  HtmlElementNode,
  ListNode,
  TextNode,
} from "@jsdevtools/rehype-toc";
import { toc as rehypeToc } from "@jsdevtools/rehype-toc";
import {
  type Client,
  iteratePaginatedAPI,
  isFullBlock,
} from "@notionhq/client";
import type { AstroIntegrationLogger, MarkdownHeading } from "astro";
import type { ParseDataOptions } from "astro/loaders";
import type { VFile } from 'vfile';

import type {
  FileObject,
  NotionPageData,
  PageObjectResponse,
} from "./types.js";
import * as transformedPropertySchema from "./schemas/transformed-properties.js";
import { fileToImageAsset, fileToUrl } from "./format.js";

// #region Processor
import notionRehype from "notion-rehype-k";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { unified, type Plugin } from "unified";

const baseProcessor = unified()
  .use(notionRehype, {}) // Parse Notion blocks to rehype AST
  .use(rehypeSlug)
  .use(
    // @ts-ignore
    rehypeKatex,
  ) // Then you can use any rehype plugins to enrich the AST
  .use(rehypeStringify); // Turn AST to HTML string

export type RehypePlugin = Plugin<any[], any>;

export function buildProcessor(
  rehypePlugins: Promise<ReadonlyArray<readonly [RehypePlugin, any]>>,
): (blocks: unknown[]) => Promise<{ vFile: VFile; headings: MarkdownHeading[] }> {
  let headings: MarkdownHeading[] = [];

  const processorWithToc = baseProcessor().use(rehypeToc, {
    customizeTOC(toc) {
      headings = extractTocHeadings(toc);
      return false;
    },
  });
  const processorPromise = rehypePlugins.then((plugins) => {
    let processor = processorWithToc;
    for (const [plugin, options] of plugins) {
      processor = processor.use(plugin, options);
    }
    return processor;
  });

  return async function process(blocks: unknown[]) {
    const processor = await processorPromise;
    const vFile = await processor.process({ data: blocks } as Record<
      string,
      unknown
    >);
    return { vFile, headings };
  };
}
// #endregion

async function awaitAll<T>(iterable: AsyncIterable<T>) {
  const result: T[] = [];
  for await (const item of iterable) {
    result.push(item);
  }
  return result;
}

/**
 * Return a generator that yields all blocks in a Notion page, recursively.
 * @param blockId ID of block to get children for.
 * @param fetchImage Function that fetches an image and returns a local path.
 */
async function* listBlocks(
  client: Client,
  blockId: string,
  fetchImage: (file: FileObject) => Promise<string>,
) {
  for await (const block of iteratePaginatedAPI(client.blocks.children.list, {
    block_id: blockId,
  })) {
    if (!isFullBlock(block)) {
      continue;
    }

    if (block.has_children) {
      const children = await awaitAll(listBlocks(client, block.id, fetchImage));
      // @ts-ignore -- TODO: Make TypeScript happy here
      block[block.type].children = children;
    }

    // Specialized handling for image blocks
    if (block.type === "image") {
      // Fetch remote image and store it locally
      const localPath = await fetchImage(block.image);

      // notion-rehype-k incorrectly expects "file" to be a string instead of an object
      yield {
        ...block,
        image: {
          type: block.image.type,
          [block.image.type]: localPath,
          caption: block.image.caption,
        },
      };
    }
    // Handle file blocks (can contain PDFs, images, etc.)
    else if (block.type === "file") {
      try {
        // Try to process as an image if it looks like one
        const fileUrl = block.file.type === "external"
          ? block.file.external.url
          : block.file.file.url;

        // Check if this looks like an image file
        if (/\.(jpe?g|png|gif|webp|svg|avif)$/i.test(fileUrl)) {
          const localPath = await fetchImage(block.file);
          yield {
            ...block,
            file: {
              type: block.file.type,
              [block.file.type]: block.file.type === "external"
                ? block.file.external.url
                : localPath,
              caption: block.file.caption,
            },
          };
        } else {
          // Not an image, pass through unchanged
          yield block;
        }
      } catch (error) {
        // In case of error, pass through unchanged
        yield block;
      }
    }
    // Handle video blocks
    else if (block.type === "video") {
      yield {
        ...block,
        video: {
          type: block.video.type,
          [block.video.type]: block.video.type === "external"
            ? block.video.external.url
            : block.video.file.url,
          caption: block.video.caption,
        },
      };
    }
    // Handle PDF blocks
    else if (block.type === "pdf") {
      yield {
        ...block,
        pdf: {
          type: block.pdf.type,
          [block.pdf.type]: block.pdf.type === "external"
            ? block.pdf.external.url
            : block.pdf.file.url,
          caption: block.pdf.caption,
        },
      };
    }
    // Handle callout blocks that might have an icon image
    else if (block.type === "callout" && block.callout.icon?.type === "file") {
      try {
        const localPath = await fetchImage(block.callout.icon as FileObject);
        yield {
          ...block,
          callout: {
            ...block.callout,
            icon: {
              type: "file",
              file: {
                url: localPath
              }
            }
          }
        };
      } catch (error) {
        // In case of error processing the icon, yield original block
        yield block;
      }
    }
    else {
      yield block;
    }
  }
}

function extractTocHeadings(toc: HtmlElementNode): MarkdownHeading[] {
  if (toc.tagName !== "nav") {
    throw new Error(`Expected nav, got ${toc.tagName}`);
  }

  function listElementToTree(ol: ListNode, depth: number): MarkdownHeading[] {
    return ol.children.flatMap((li) => {
      const [_link, subList] = li.children;
      const link = _link as HtmlElementNode;

      const currentHeading: MarkdownHeading = {
        depth,
        text: (link.children![0] as TextNode).value,
        slug: link.properties.href!.slice(1),
      };

      let headings = [currentHeading];
      if (subList) {
        headings = headings.concat(
          listElementToTree(subList as ListNode, depth + 1),
        );
      }
      return headings;
    });
  }

  return listElementToTree(toc.children![0] as ListNode, 0);
}

export interface RenderedNotionEntry {
  html: string;
  metadata: {
    imagePaths: string[];
    headings: MarkdownHeading[];
  };
}

export class NotionPageRenderer {
  #imagePaths: string[] = [];
  #logger: AstroIntegrationLogger;

  /**
   * @param client Notion API client.
   * @param page Notion page object including page ID and properties. Does not include blocks.
   * @param parentLogger Logger to use for logging messages.
   */
  constructor(
    private readonly client: Client,
    private readonly page: PageObjectResponse,
    parentLogger: AstroIntegrationLogger,
  ) {
    // Create a sub-logger labelled with the page name
    const pageTitle = transformedPropertySchema.title.safeParse(
      page.properties.Name,
    );
    this.#logger = parentLogger.fork(
      `page ${page.id} (Name ${pageTitle.success ? pageTitle.data : "unknown"})`,
    );
    if (!pageTitle.success) {
      this.#logger.warn(
        `Failed to parse property Name as title: ${pageTitle.error.toString()}`,
      );
    }
  }

  /**
   * Return page properties for Astro to use.
   */
  getPageData(): ParseDataOptions<NotionPageData> {
    const { page } = this;

    // Process page cover if it exists and is a file
    if (page.cover && page.cover.type === 'file') {
      try {
        // Process the cover image asynchronously
        this.#processCoverImage(page.cover).catch(error =>
          this.#logger.error(`Failed to process cover image: ${getErrorMessage(error)}`)
        );
      } catch (error) {
        this.#logger.error(`Error setting up cover image processing: ${getErrorMessage(error)}`);
      }
    }

    // Process properties that might contain files/images
    this.#processPropertyImages(page.properties).catch(error =>
      this.#logger.error(`Failed to process property images: ${getErrorMessage(error)}`)
    );

    return {
      id: page.id,
      data: {
        icon: page.icon,
        cover: page.cover,
        archived: page.archived,
        in_trash: page.in_trash,
        url: page.url,
        public_url: page.public_url,
        properties: page.properties,
      },
    };
  }

  /**
   * Process page cover image asynchronously.
   * This downloads the cover image and updates the page cover object in place.
   */
  #processCoverImage = async (cover: FileObject) => {
    try {
      const fetchedImageData = await fileToImageAsset(cover);
      // Replace the URL in the cover object with our local URL
      if (cover.type === 'file') {
        cover.file.url = fetchedImageData.src;
      }
    } catch (error) {
      this.#logger.error(`Failed to process cover image: ${getErrorMessage(error)}`);
    }
  }

  /**
   * Process any images found in page properties.
   * This includes files and images that might be in property values.
   */
  #processPropertyImages = async (properties: Record<string, any>) => {
    try {
      for (const key in properties) {
        const property = properties[key];

        // Handle files property type
        if (property.type === 'files' && Array.isArray(property.files)) {
          for (const file of property.files) {
            if (file.type === 'file') {
              try {
                // Only process files that appear to be images
                const fileUrl = file.file.url;
                if (/\.(jpe?g|png|gif|webp|svg|avif)$/i.test(fileUrl)) {
                  const fetchedImageData = await fileToImageAsset(file);
                  file.file.url = fetchedImageData.src;
                }
              } catch (error) {
                this.#logger.error(`Failed to process file in property ${key}: ${getErrorMessage(error)}`);
              }
            }
          }
        }
      }
    } catch (error) {
      this.#logger.error(`Error processing property images: ${getErrorMessage(error)}`);
    }
  }

  /**
   * Return rendered HTML for the page.
   * @param process Processor function to transform Notion blocks into HTML.
   * This is created once for all pages then shared.
   */
  async render(
    process: ReturnType<typeof buildProcessor>,
  ): Promise<RenderedNotionEntry | undefined> {
    this.#logger.debug("Rendering");
    try {
      const blocks = await awaitAll(
        listBlocks(this.client, this.page.id, this.#fetchImage),
      );

      const { vFile, headings } = await process(blocks);

      this.#logger.debug("Rendered");
      return {
        html: vFile.toString(),
        metadata: {
          headings,
          imagePaths: this.#imagePaths,
        },
      };
    } catch (error) {
      this.#logger.error(`Failed to render: ${getErrorMessage(error)}`);
      return undefined;
    }
  }

  /**
   * Helper function to convert remote Notion images into local images in Astro.
   * Additionally saves the path in `this.#imagePaths`.
   * @param imageFileObject Notion file object representing an image.
   * @returns Local path to the image, or undefined if the image could not be fetched.
   */
  #fetchImage = async (imageFileObject: FileObject) => {
    try {
      const fetchedImageData = await fileToImageAsset(imageFileObject);
      this.#imagePaths.push(fetchedImageData.src);
      return fetchedImageData.src;
    } catch (error) {
      this.#logger.error(
        `Failed to fetch image when rendering page: ${getErrorMessage(error)}`
      );
      // Fall back to using the remote URL directly as a last resort
      return fileToUrl(imageFileObject);
    }
  };
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  } else if (typeof error === "string") {
    return error;
  } else {
    return "Unknown error";
  }
}
