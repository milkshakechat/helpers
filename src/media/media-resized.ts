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

// Actual
// https://firebasestorage.googleapis.com/v0/b/200x200/o/users%2Fm2fb0WWHOBesIAsevvCeNfv1w2Z2%2Favatars%2Fresized-media%2F92011d27-1d6e-453b-b994-d42a3d824657_200x200.jpeg?alt=media

// Expected
// https://firebasestorage.googleapis.com/v0/b/milkshake-dev-faf77.appspot.com/o/users%2Fm2fb0WWHOBesIAsevvCeNfv1w2Z2%2Favatars%2Fresized-media%2F92011d27-1d6e-453b-b994-d42a3d824657_200x200.jpeg?alt=media&token=18fb7d93-11e1-4999-88d2-abe5d8e91ee2
