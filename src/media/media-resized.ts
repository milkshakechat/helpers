export enum ImageResizeOption {
  "thumbnail" = "200x200",
  "compressed" = "768x768",
}
export enum BucketFolderSlug {
  "avatars" = "avatars/",
  "story_image" = "story/image/",
}

export function getCompressedMediaUrl(
  url: string,
  folderSlug: BucketFolderSlug,
  size: ImageResizeOption
): string {
  // Extract baseURL until slug (inclusive), filename and query part (if exists)
  let [baseURL, filenameAndQuery] = url.split(
    `${encodeURIComponent(`${folderSlug}`)}`
  );
  let [filename, query] = filenameAndQuery.split("?");

  // Remove file extension (.png, .jpeg, .jpg)
  filename = filename.split(".")[0];

  // Create new compressed filename
  let newFilename = `${filename}_${size}.jpeg`;

  // If query exists, preserve ?alt=media part only
  if (query) {
    let queryParams = new URLSearchParams(query);
    if (queryParams.has("alt")) {
      query = `?alt=${queryParams.get("alt")}`;
    } else {
      query = "";
    }
  }

  // Construct the new URL with encoded segments
  let newURL = `${baseURL}${encodeURIComponent(
    `${folderSlug}/resized-media/`
  )}${encodeURIComponent(newFilename)}${query}`;

  return newURL;
}
