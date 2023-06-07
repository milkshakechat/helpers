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
  operatorID: UserID; // index
  ownerID: UserID; // index
  title: string;
  createdAt: TimestampFirestore;
  note: string;
  cookieBalance: number;
  assumedRealValueUSDBalance: number;
}

export enum TransactionType {
  COOKIE = "COOKIE",
  STICKER = "STICKER",
  GIFT_CARD = "GIFT_CARD",
}

export interface Transaction {
  id: TransactionID; // index
  senderWalletID: WalletID; // index
  recieverWalletID: WalletID; // index
  cookieQuantitySent: number;
  cookieQuantityFee: number;
  cookieQuantityReceived: number;
  realValueUSD: number;
  note: string;
  type: TransactionType;
  createdAt: TimestampFirestore;
  metadata: TransactionMetadata;
}

export interface TransactionMetadata {
  transactionID: TransactionID;
  stickerSaleMetadata?: {
    stickerSaleID: StickerSaleID;
    stickerID: StickerID;
    wishlistID?: WishlistID;
    promoCode?: string;
  };
  cookieSaleMetadata?: {
    cookieSaleID: CookieSaleID;
    promoCode?: string;
  };
  giftCardSaleMetadata?: {
    giftCardSaleID: GiftCardSaleID;
    redeemerID?: UserID;
    isValid?: boolean;
    promoCode?: string;
  };
}

export interface JournalEntry {
  id: JournalEntryID; // index
  transactionID: TransactionID; // index
  walletID: WalletID; // index
  cookieQuantityDelta: number;
  realValueUSDDelta: number;
  note: string;
  createdAt: TimestampFirestore;
}

/**
 * Example purchase of cookies
 * - 1 Transaction created
 * - 1 JournalEntries created
 *     - add cookies to receiver
 *
 * Example purchase of stickers
 * - 1 Transaction created
 * - 3 JournalEntries created
 *      - deduct cookies from sender
 *      - add cookies to receiver
 *      - add cookies to house
 *
 * Example purchase of gift card
 * - 1 Transaction created
 * - 1 JournalEntries created
 *      - add cookies to gift card
 *
 * Example redemption of gift card
 * - 1 Transaction created
 * - 2 JournalEntries created
 *      - deduct cookies from gift card
 *      - add cookies to receiver
 *
 */
