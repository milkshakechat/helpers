import { StoryID, UserID } from "../types/base.types";

export enum ImageResizeOption {
  "thumbnail" = "200x200",
  "compressed" = "768x768",
}
export enum BucketFolderSlug {
  "avatars" = "avatars/",
  "story_image" = "story/image/",
}

export function getCompressedAvatarUrl({
  userID,
  assetID,
  size = ImageResizeOption.thumbnail,
  bucketName,
}: {
  userID: UserID;
  assetID: string;
  size?: ImageResizeOption;
  bucketName: string;
}): string {
  const base = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/`;
  const path = encodeURIComponent(
    `users/${userID}/avatars/resized-media/${assetID}_${size}.jpeg`
  );
  const newURL = `${base}${path}?alt=media`;
  return newURL;
}

export function getCompressedStickerUrl({
  userID,
  assetID,
  size = ImageResizeOption.thumbnail,
  bucketName,
}: {
  userID: UserID;
  assetID: string;
  size?: ImageResizeOption;
  bucketName: string;
}): string {
  const base = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/`;
  const path = encodeURIComponent(
    `users/${userID}/sticker/resized-media/${assetID}_${size}.jpeg`
  );
  const newURL = `${base}${path}?alt=media`;
  return newURL;
}

export function getCompressedWishlistGraphicUrl({
  userID,
  assetID,
  size = ImageResizeOption.compressed,
  bucketName,
}: {
  userID: UserID;
  assetID: string;
  size?: ImageResizeOption;
  bucketName: string;
}): string {
  const base = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/`;
  const path = encodeURIComponent(
    `users/${userID}/wishlist/resized-media/${assetID}_${size}.jpeg`
  );
  const newURL = `${base}${path}?alt=media`;
  return newURL;
}

export function getCompressedStoryImageUrl({
  storyID,
  userID,
  size,
  assetID,
  bucketName,
}: {
  storyID: StoryID;
  userID: UserID;
  assetID: string;
  size: ImageResizeOption;
  bucketName: string;
}): string {
  const path = encodeURIComponent(
    `users/${userID}/story/IMAGE/${assetID}/resized-media/${assetID}_${size}.jpeg`
  );
  const base = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/`;
  const newURL = `${base}${path}?alt=media`;
  console.log(`newURL`, newURL);
  return newURL;
}
