import {
  CookieTransactionID,
  CreatorSaleRecordID,
  OwnedStickerID,
  PurchaseRecordID,
  StickerID,
  TimestampFirestore,
  UserID,
  WishlistID,
} from "./base.types";
import { CookieTransaction } from "./cookie.types";
import { MediaFile_Firestore } from "./story.firestore.types";

export interface Wishlist_Firestore {
  id: WishlistID; // index
  title: string;
  description: string;
  thumbnail: string;
  items: StickerID[];
  creatorID: UserID; // index
  createdAt: TimestampFirestore;
}

export interface Sticker_Firestore {
  id: StickerID; // index
  title: string;
  description: string;
  thumbnail: string;
  cookiePrice: number;
  url: string;
  creatorID: UserID; // index
  galleryMediaSet: MediaFile_Firestore[];
  stickerTitle: string;
  stickerMediaSet: MediaFile_Firestore[];
}

export interface CreatorSaleRecord_Firestore {
  id: CreatorSaleRecordID; // index
  creatorID: UserID; // index
  purchaserID: UserID; // index
  stickerID: StickerID; // index
  note: string;
  salePriceInCookies: number;
  wishlistID?: WishlistID;
  createdAt: TimestampFirestore;
  cookieTransactions: CookieTransactionID[];
  totalRealValueUSD: number;
}

export interface OwnedSticker_Firestore {
  id: OwnedStickerID; // index
  ownerID: UserID; // index
  title: string;
  creatorSaleRecordID: CreatorSaleRecordID;
  purchaseRecordID: PurchaseRecordID;
  stickerID: StickerID;
  creatorID: UserID; // index
  mediaSet: MediaFile_Firestore[];
}
