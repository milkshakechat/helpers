export const QRCODE_LOGO =
  "https://firebasestorage.googleapis.com/v0/b/milkshake-dev-faf77.appspot.com/o/app-public-shared%2Fqr-icon.jpg?alt=media";

export function isValidHashtag(hashtag: string) {
  // Check if hashtag starts with '#'
  if (hashtag[0] !== "#") {
    return false;
  }

  // Remove '#' from the hashtag
  const tag = hashtag.slice(1);

  // Check if tag contains only alphanumeric characters and underscores
  if (/^[A-Za-z0-9_]+$/.test(tag)) {
    return true;
  } else {
    return false;
  }
}
