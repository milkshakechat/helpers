import {
  OwnedStickerID,
  StickerSaleID,
  StripePriceID,
  StripeProductID,
  TimestampFirestore,
  UserID,
  WishID,
  WishlistID,
} from "./base.types";

// export interface Wishlist_Firestore {
//   id: WishlistID; // index
//   title: string;
//   description: string;
//   thumbnail: string;
//   items: StickerID[];
//   creatorID: UserID; // index
//   createdAt: TimestampFirestore;
// }

export interface MediaSet {
  small: string;
  medium: string;
  large?: string;
}

export enum WishBuyFrequency {
  ONE_TIME = "ONE_TIME",
  MONTHLY = "MONTHLY",
  WEEKLY = "WEEKLY",
  DAILY = "DAILY",
}

export const WishBuyFrequencyPrettyPrint = (frequency: WishBuyFrequency) => {
  switch (frequency) {
    case WishBuyFrequency.ONE_TIME:
      return "One Time Payment";
      break;
    case WishBuyFrequency.MONTHLY:
      return "Monthly Subscription";
      break;
    case WishBuyFrequency.WEEKLY:
      return "Weekly Subscription";
      break;
    case WishBuyFrequency.DAILY:
      return "Daily Subscription";
      break;
    default:
      return "Unknown Payment Frequency";
      break;
  }
};

export const WishBuyFrequencyPrettyPrintShort = (
  frequency: WishBuyFrequency
) => {
  switch (frequency) {
    case WishBuyFrequency.ONE_TIME:
      return "Once";
      break;
    case WishBuyFrequency.MONTHLY:
      return "Monthly";
      break;
    case WishBuyFrequency.WEEKLY:
      return "Weekly";
      break;
    case WishBuyFrequency.DAILY:
      return "Daily";
      break;
    default:
      return "";
      break;
  }
};

export const cookieToUSD = (cookies: number) => {
  const exchangeRate = 1.34 / 1;
  return parseFloat((cookies * exchangeRate).toFixed(2));
};
export const usdToCookie = (usd: number) => {
  const exchangeRate = 1 / 1.34;
  return Math.ceil(parseFloat((usd * exchangeRate).toFixed(2)));
};
export const PREMIUM_CHAT_PRICE_COOKIES_MONTHLY = 1;

export enum WishlistVisibility {
  PUBLIC_MARKETPLACE = "PUBLIC_MARKETPLACE",
  FRIENDS_ONLY = "FRIENDS_ONLY",
  HIDDEN = "HIDDEN",
}

export enum WishTypeEnum {
  EVENT = "EVENT",
  GIFT = "GIFT",
}

export interface Wish_Firestore {
  id: WishID; // index
  creatorID: UserID; // index
  wishTitle: string;
  stickerTitle: string;
  description: string;
  thumbnail: string;
  cookiePrice: number;
  galleryMediaSet: MediaSet[];
  stickerMediaSet: MediaSet;
  isFavorite: boolean;
  deleted: boolean;
  createdAt: TimestampFirestore;
  buyFrequency: WishBuyFrequency;
  visibility: WishlistVisibility;
  wishType: WishTypeEnum;
  countdownDate?: TimestampFirestore;
  externalURL?: string;
  // stripe
  stripeProductID?: StripeProductID;
}

// export interface OwnedSticker_Firestore {
//   id: OwnedStickerID; // index
//   ownerID: UserID; // index
//   title: string;
//   stickerSaleID: StickerSaleID;
//   stickerID: StickerID;
//   creatorID: UserID; // index
//   mediaSet: MediaFile_Firestore[];
// }
