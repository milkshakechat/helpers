import {
  CookieSaleID,
  GiftCardSaleID,
  JournalEntryID,
  StickerID,
  StickerSaleID,
  WalletID,
  TimestampFirestore,
  TransactionID,
  UserID,
  WishlistID,
} from "./base.types";

export interface Wallet_Firestore {
  id: WalletID; // index
  ownerID: UserID; // index
  title: string;
  createdAt: TimestampFirestore;
}

export interface Transaction {
  id: TransactionID; // index
  sender: UserID;
  reciever: UserID;
  cookieQuantitySent: number;
  cookieQuantityFee: number;
  cookieQuantityReceived: number;
}

export interface JournalEntry {
  id: JournalEntryID; // index
  transactionID: TransactionID; // index
  userID: UserID;
  cookieQuantityDelta: number;
}

export interface GiftCardSale_Firestore {
  id: GiftCardSaleID; // index
  purchaserID: UserID; // index
  transactionID: TransactionID; // index
  redeemerID: UserID; // index
  quantityCookies: number;
  purchasePriceUSD: number;
  note: string;
  isValid: boolean;
  createdAt: TimestampFirestore;
  redeemedAt: TimestampFirestore;
}

export interface CookieBatch_Firestore {
  id: CookieSaleID; // index
  purchaserID: UserID; // index
  transactionID: TransactionID; // index
  quantityCookies: number;
  purchasePriceUSD: number;
  note: string;
  createdAt: TimestampFirestore;
}

export interface StickerSale_Firestore {
  id: StickerSaleID; // index
  purchaserID: UserID; // index
  transactionID: TransactionID; // index
  creatorID: UserID;
  stickerID: StickerID;
  note: string;
  salePriceInCookies: number;
  wishlistID?: WishlistID;
  createdAt: TimestampFirestore;
}

/**
 * Example purchase of cookies
 * - 1 Transaction created
 * - 1 JournalEntries created
 *     - add cookies to receiver
 * - 1 CookieBatch sale recorded
 *
 * Example purchase of stickers
 * - 1 Transaction created
 * - 3 JournalEntries created
 *      - deduct cookies from sender
 *      - add cookies to receiver
 *      - add cookies to house
 * - 1 sticker sale recorded
 *
 * Example purchase of gift card
 * - 1 Transaction created
 * - 1 JournalEntries created
 *      - add cookies to gift card
 * - 1 Gift Card sale recorded
 *
 * Example redemption of gift card
 * - 1 Transaction created
 * - 2 JournalEntries created
 *      - deduct cookies from gift card
 *      - add cookies to receiver
 * - 1 Gift Card updated with redemption
 *
 */
