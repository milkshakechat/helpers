export type UserID = string & {
  readonly _: unique symbol;
};
export type sendBirdInternalUserID = string & {
  readonly _: unique symbol;
};
export type WalletID = string & {
  readonly _: unique symbol;
};
export type StoryID = string & {
  readonly _: unique symbol;
};
export type StoryAttachmentID = string & {
  readonly _: unique symbol;
};
export type FriendshipID = string & {
  readonly _: unique symbol;
};
export type FriendRequestID = string & {
  readonly _: unique symbol;
};
export type TeaserMessageID = string & {
  readonly _: unique symbol;
};
export type AudienceGroupID = string & {
  readonly _: unique symbol;
};
export type NotificationID = string & {
  readonly _: unique symbol;
};
export type WishlistID = string & {
  readonly _: unique symbol;
};
export type StickerID = string & {
  readonly _: unique symbol;
};
export type CreatorSaleRecordID = string & {
  readonly _: unique symbol;
};
export type OwnedStickerID = string & {
  readonly _: unique symbol;
};
export type CookieBatchID = string & {
  readonly _: unique symbol;
};
export type GiftCardID = string & {
  readonly _: unique symbol;
};
export type PurchaseRecordID = string & {
  readonly _: unique symbol;
};
export type CookieTransactionID = string & {
  readonly _: unique symbol;
};

export type EmailString = string;

export enum StoryAttachmentType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  LINK = "LINK",
}

export { Timestamp as TimestampFirestore } from "firebase/firestore";

export const placeholderVideoThumbnail =
  "https://firebasestorage.googleapis.com/v0/b/superlore-dev.appspot.com/o/defaults%2Fvideo-thumbnail.png?alt=media";

export const placeholderImageThumbnail =
  "https://firebasestorage.googleapis.com/v0/b/superlore-dev.appspot.com/o/defaults%2Fimage-thumbnail.jpeg?alt=media";

export const placeholderAudioThumbnail =
  "https://firebasestorage.googleapis.com/v0/b/superlore-dev.appspot.com/o/defaults%2Faudio-thumbnail.jpeg?alt=media";
