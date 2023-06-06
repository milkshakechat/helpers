import {
  CookieBatchID,
  CookieTransactionID,
  GiftCardID,
  PurchaseRecordID,
  TimestampFirestore,
  UserID,
  WalletID,
} from "./base.types";

export interface CookieBatch_Firestore {
  id: CookieBatchID; // index
  boughtBy: UserID; // index
  walletID: WalletID; // index
  cookiesBoughtQuantity: number;
  purchasePriceUSD: number;
  cookieRealUnitValueUSD: number;
  purchaseRecordID: PurchaseRecordID;
  createdAt: TimestampFirestore;
  giftCardID?: GiftCardID;
  // can be calculated CookieTransaction[] and should match checksum
  cookiesRemaining: number;
  remainingCookieValueUSD: number;
}

export interface GiftCard_Firestore {
  id: GiftCardID; // index
  crumbsQuantity: number;
  cookieRealUnitValueUSD: number;
  totalRealValueUSD: number;
  redeemedByUserID: UserID; // index
  redeemedDate: TimestampFirestore;
  isValid: boolean;
  createdAt: TimestampFirestore;
}

export interface CookieTransaction {
  id: CookieTransactionID;
  cookieBatchID: CookieBatchID;
  cookieQuantity: number;
  spenderID: UserID;
  receiverID: UserID;
  cookieRealUnitValueUSD: number;
  totalRealValueUSD: number;
  createdAt: TimestampFirestore;
}
