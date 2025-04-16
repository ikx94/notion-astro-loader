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

  // Parse URL and create unique filename
  // For URL with query params, use the path portion for extension detection
  const parsedUrl = new URL(url);

  // Generate a unique hash from the full URL for uniqueness
  const urlHash = crypto.createHash('md5').update(url).digest('hex');

  // Extract extension from pathname, not the full URL with query params
  const extension = path.extname(parsedUrl.pathname) || '.jpg'; // Fallback to .jpg if no extension

  const filename = `${urlHash}${extension}`;
  const outputPath = path.join(imagesDir, filename);
  const publicPath = `/notion-images/${filename}`;

  // Skip download if file already exists
  if (fs.existsSync(outputPath)) {
    console.log(`Using cached image: ${filename}`);
    return publicPath;
  }

  // Log the download attempt
  console.log(`Downloading image from: ${parsedUrl.hostname}${parsedUrl.pathname}... (${filename})`);

  // Download the image - setting a timeout and proper headers
  return new Promise((resolve, reject) => {
    const request = https.get(
      url,
      {
        timeout: 30000, // 30-second timeout
        headers: {
          'User-Agent': 'NotionAstroLoader/1.0',
          'Accept': 'image/*'
        }
      },
      (response) => {
        // Handle redirects manually if needed
        if (response.statusCode === 301 || response.statusCode === 302) {
          const redirectUrl = response.headers.location;
          if (redirectUrl) {
            console.log(`Following redirect to: ${redirectUrl}`);
            // Recursively call downloadImage with the new URL
            downloadImage(redirectUrl).then(resolve).catch(reject);
            return;
          }
        }

        if (response.statusCode !== 200) {
          const error = new Error(`Failed to download image: HTTP ${response.statusCode}`);
          console.error(error.message);
          reject(error);
          return;
        }

        const fileStream = fs.createWriteStream(outputPath);
        response.pipe(fileStream);

        let size = 0;
        response.on('data', (chunk) => {
          size += chunk.length;
        });

        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`Downloaded image (${Math.round(size / 1024)}KB): ${filename}`);
          resolve(publicPath);
        });

        fileStream.on('error', (err) => {
          fs.unlink(outputPath, () => { }); // Clean up on error
          console.error(`Error writing image file: ${err.message}`);
          reject(err);
        });
      }
    );

    request.on('error', (err) => {
      console.error(`Network error downloading image: ${err.message}`);
      reject(err);
    });

    request.on('timeout', () => {
      request.destroy();
      console.error(`Download timeout for image: ${url}`);
      reject(new Error(`Download timeout for image: ${url}`));
    });
  });
}

/**
 * Extract and locally cache the image from a file object.
 * Instead of using Astro's image optimization, we download and store the image locally.
 * @see https://developers.notion.com/reference/file-object
 */
export async function fileToImageAsset(
  file: FileObject | { type: "file" | "external"; file?: { url: string }; external?: { url: string } }
): Promise<{ src: string }> {
  const url = fileToUrl(file as FileObject);
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
