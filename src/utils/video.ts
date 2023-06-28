export function getVideoFileExtension(urlString: string): string | null {
  try {
    // Split the URL by '/' and take the last part to get the file name
    const fileName = urlString.split("/").pop();

    // Split the file name by '?' to remove any query parameters
    const baseName = fileName?.split("?")[0];

    // Split the base name by '.' and take the last part to get the extension
    const ext = baseName?.split(".").pop();

    // Check if the extension exists and is not the same as the base name
    if (fileName && baseName && ext && ext !== baseName) {
      // Return the extension without leading dot
      return ext;
    } else {
      // If no extension found
      return null;
    }
  } catch (e) {
    console.error(`Failed to get extension from url ${urlString}: ${e}`);
    return null;
  }
}
