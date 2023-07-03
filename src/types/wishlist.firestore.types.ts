import {
  OwnedStickerID,
  StickerSaleID,
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
