import {
  CookieBatchID,
  PurchaseRecordID,
  StickerID,
  TimestampFirestore,
  UserID,
  WalletID,
} from "./base.types";

export interface Wallet_Firestore {
  id: WalletID; // index
  holderID: UserID; // index
  title: string;
  createdAt: TimestampFirestore;
  ownerID: UserID; // typically use wallet.holder. only has ownerID if agency
}

export enum PurchaseType {
  STICKER = "STICKER",
  COOKIES = "COOKIES",
}

export interface PurchaseRecord_Firestore {
  id: PurchaseRecordID; // index
  purchaserID: UserID; // index
  note: string;
  amountSpentUSD: number;
  purchaseType: PurchaseType;
  creatorID?: UserID;
  stickerID?: StickerID;
  cookiesBoughtQuantity?: number;
  createdAt: TimestampFirestore;
}
