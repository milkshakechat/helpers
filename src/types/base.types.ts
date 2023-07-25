export type UserID = string & {
  readonly _: unique symbol;
};
export type SendBirdUserID = string & {
  readonly _: unique symbol;
};
export type WalletID = string & {
  readonly _: unique symbol;
};
export type WalletAliasID = string & {
  readonly _: unique symbol;
};
export type StripeMerchantID = string & {
  readonly _: unique symbol;
};
export type StripeCustomerID = string & {
  readonly _: unique symbol;
};
export type StoryID = string & {
  readonly _: unique symbol;
};
export type StoryAttachmentID = string & {
  readonly _: unique symbol;
};
export type StoryInteractionID = string & {
  readonly _: unique symbol;
};
export type FriendshipID = string & {
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
export type WishID = string & {
  readonly _: unique symbol;
};
export type OwnedStickerID = string & {
  readonly _: unique symbol;
};
export type CookieSaleID = string & {
  readonly _: unique symbol;
};
export type GiftCardSaleID = string & {
  readonly _: unique symbol;
};
export type StickerSaleID = string & {
  readonly _: unique symbol;
};
export type TransactionID = string & {
  readonly _: unique symbol;
};
export type MirrorTransactionID = string & {
  readonly _: unique symbol;
};
export type TxRefID = string & {
  readonly _: unique symbol;
};
export type MirrorWalletAliasID = string & {
  readonly _: unique symbol;
};
export type CardChargeID = string & {
  readonly _: unique symbol;
};
export type PurchaseMainfestID = string & {
  readonly _: unique symbol;
};
export type StripePaymentIntentID = string & {
  readonly _: unique symbol;
};
export type StripeSubscriptionID = string & {
  readonly _: unique symbol;
};
export type StripePaymentMethodID = string & {
  readonly _: unique symbol;
};
export type PushTokenID = string & {
  readonly _: unique symbol;
};
export type PushMessageRecieptID = string & {
  readonly _: unique symbol;
};
export type NotificationTopicID = string & {
  readonly _: unique symbol;
};
export type Username = string & {
  readonly _: unique symbol;
};
export type ChatRoomID = string & {
  readonly _: unique symbol;
};
export type SendBirdAccessToken = string & {
  readonly _: unique symbol;
};
export type SendBirdMessageID = string & {
  readonly _: unique symbol;
};
export type StripeProductID = string & {
  readonly _: unique symbol;
};
export type StripePriceID = string & {
  readonly _: unique symbol;
};
export type StripeSubItemID = string & {
  readonly _: unique symbol;
};

export type EmailString = string;
export type Bucket_File_URL = string;

export type ThemeColorHex = string;

import { FieldValue, Timestamp } from "firebase-admin/firestore";
export type TimestampFirestore = FieldValue | Timestamp;

export enum FirestoreCollection {
  USERS = "users",
  PUSH_TOKENS = "pushTokens",
  NOTIFICATIONS = "notifications",
  FRIENDSHIPS = "friendships",
  CHAT_ROOMS = "chatRooms",

  WISH = "wish",
  STORIES = "stories",
  STORY_INTERACTIONS = "storyInteractions",

  // mirror wallet
  MIRROR_WALLETS = "mirrorWallets",
  MIRROR_TX = "mirrorTx",

  // shopping
  PURCHASE_MANIFESTS = "purchaseManifests",
}

export const placeholderVideoThumbnail =
  "https://firebasestorage.googleapis.com/v0/b/superlore-dev.appspot.com/o/defaults%2Fvideo-thumbnail.png?alt=media";

export const placeholderImageThumbnail =
  "https://firebasestorage.googleapis.com/v0/b/superlore-dev.appspot.com/o/defaults%2Fimage-thumbnail.jpeg?alt=media";

export const placeholderAudioThumbnail =
  "https://firebasestorage.googleapis.com/v0/b/superlore-dev.appspot.com/o/defaults%2Faudio-thumbnail.jpeg?alt=media";

export const placeholderSticker =
  "https://firebasestorage.googleapis.com/v0/b/milkshake-dev-faf77.appspot.com/o/app-public-shared%2Fdefault_sticker.jpg?alt=media";

export const placeholderWishlistGraphic =
  "https://firebasestorage.googleapis.com/v0/b/milkshake-dev-faf77.appspot.com/o/app-public-shared%2Fdefault_gift.jpeg?alt=media";
