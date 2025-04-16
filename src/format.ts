import type { FileObject } from "./types.js";
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import https from 'node:https';

/**
 * Extract a plain string from a list of rich text items.
 *
 * @see https://developers.notion.com/reference/rich-text
 *
 * @example
 * richTextToPlainText(page.properties.Name.title)
 */
export function richTextToPlainText(
  data: ReadonlyArray<{ plain_text: string }>,
): string {
  return data.map((text) => text.plain_text).join("");
}

/**
 * Extract the URL from a file property.
 *
 * @see https://developers.notion.com/reference/file-object
 */
export function fileToUrl(file: FileObject): string;
export function fileToUrl(file: FileObject | null): string | undefined;
export function fileToUrl(file: FileObject | null): string | undefined {
  switch (file?.type) {
    case "external":
      return file.external.url;
    case "file":
      return file.file.url;
    default:
      return undefined;
  }
}

/**
 * Download and store the image from a Notion file object locally.
 * This replaces the remote AWS presigned URL with a local path.
 */
async function downloadImage(url: string): Promise<string> {
  // Create images directory if it doesn't exist
  const imagesDir = path.join(process.cwd(), 'public', 'notion-images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  // Generate a unique filename based on the URL hash
  const urlHash = crypto.createHash('md5').update(url).digest('hex');
  const extension = path.extname(new URL(url).pathname) || '.jpg'; // Fallback to .jpg if no extension
  const filename = `${urlHash}${extension}`;
  const outputPath = path.join(imagesDir, filename);
  const publicPath = `/notion-images/${filename}`;

  // Skip download if file already exists
  if (fs.existsSync(outputPath)) {
    return publicPath;
  }

  // Download the image
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(outputPath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve(publicPath);
      });

      fileStream.on('error', (err) => {
        fs.unlink(outputPath, () => { }); // Clean up on error
        reject(err);
      });
    }).on('error', reject);
  });
}

/**
 * Extract and locally cache the image from a file object.
 * Instead of using Astro's image optimization, we download and store the image locally.
 * @see https://developers.notion.com/reference/file-object
 */
export async function fileToImageAsset(
  file: FileObject,
): Promise<{ src: string }> {
  const url = fileToUrl(file);
  if (!url) {
    throw new Error("Could not extract URL from file object");
  }

  // Download the image and return the local path
  const localPath = await downloadImage(url);
  return { src: localPath };
}

/**
 * Replace date strings with date objects.
 *
 * @see https://developers.notion.com/reference/page-property-values#date
 */
export function dateToDateObjects(
  dateResponse: {
    start: string;
    end: string | null;
    time_zone: string | null;
  } | null,
) {
  if (dateResponse === null) {
    return null;
  }

  return {
    start: new Date(dateResponse.start),
    end: dateResponse.end ? new Date(dateResponse.end) : null,
    time_zone: dateResponse.time_zone,
  };
}
