import {
  CookieSaleID,
  GiftCardSaleID,
  JournalEntryID,
  StickerSaleID,
  WalletID,
  TimestampFirestore,
  TransactionID,
  UserID,
  WishlistID,
  WishID,
  StripeMerchantID,
  StripeCustomerID,
  CardChargeID,
  WishDealID,
  StripePaymentIntentID,
  StripeSubscriptionID,
} from "./base.types";
import { WishBuyFrequency } from "./wishlist.firestore.types";

export interface Wallet_QuantumLedger {
  // base info
  id: WalletID; // index
  ownerID: UserID; // index
  title: string;
  note: string;
  createdAt: TimestampFirestore;
  // stripe foreign keys
  stripeCustomerID?: StripeCustomerID;
  stripeCustomerSubscriptionID?: StripeSubscriptionID;
  stripeMerchantID?: StripeMerchantID;
  hasMerchantPrivilege: boolean;
  // wallet details
  balance: number;
}

// created every time a credit card is charged by Stripe
// could be one-time payment, or subscription payment webhook
export interface CardCharge {
  id: CardChargeID; // index
  userID: UserID; // index
  amount: number;
  currency: string;
  source: string;
  createdAt: TimestampFirestore;
  wishDealSnapshot: WishDealID[];
  stripePaymentIntentID?: StripePaymentIntentID;
  stripeSubscriptionID?: StripeSubscriptionID;
}

// a log of every wish bought/sold by a user
// subscriptions appear as just 1 wish deal
// one time sales appear as 1 wish deal
// cookie transfers do NOT appear as a wish deal
// this is primarily for the user to see a summary of their past purchases
export interface WishDeal {
  // basic info
  id: WishDealID;
  note: string;
  createdAt: TimestampFirestore;
  // foriegn keys
  buyerUserID: UserID; // index
  sellerUserID: UserID; // index
  wishID: WishID; // index
  // wish details
  agreedCookiePrice: number;
  originalCookiePrice: number;
  // subscription details
  agreedBuyFrequency: WishBuyFrequency;
  originalBuyFrequency: WishBuyFrequency;
  isCancelled: boolean;
  cancelledAt?: TimestampFirestore;
  cancelledBy?: UserID;
}

// created every time a user transacts with cookies
// this can be independent of CardCharges
export interface Transaction {
  // base info
  id: TransactionID; // index
  title: string;
  note: string;
  createdAt: TimestampFirestore;
  // foriegn keys
  senderWalletID: WalletID; // index
  recieverWalletID: WalletID; // index
  wishDealID?: WishDealID; // index
  // archive log with pov
  explanation: {
    [key: WalletID]: {
      title: string;
      note: string;
      avatar: string;
    };
  };
  // transaction details
  cookieQuantity: number;
  type: TransactionType;
  attribution?: string;
  gotReverted: boolean; // reverted means return or recalled. default is false, but if ever recalled/returned this will become true. allows us to prevent double reversals
  metadata: TransactionMetadata;
}

export enum TransactionType {
  DEAL = "DEAL", // when a user buys a wish
  REFUND = "REFUND", // when a user refunds a wish
  TRANSFER = "TRANSFER", // when a user transfers cookies to another user
  TOP_UP = "TOP_UP", // when a user buys cookies from the house to top up their wallet
}

export interface TransactionMetadata {
  transactionID: TransactionID;
  dealMetadata?: {
    buyerNote: string;
    promoCode?: string;
    // deal details
    agreedCookiePrice: number;
    originalCookiePrice: number;
    agreedBuyFrequency: WishBuyFrequency;
    originalBuyFrequency: WishBuyFrequency;
  };
  refundMetadata?: {
    refundTransactionID: TransactionID;
    buyerNote: string;
    sellerNote: string;
    internalNote: string;
  };
  transferMetadata?: {
    senderNote: string;
  };
  topUpMetadata?: {
    internalNote: string;
    promoCode?: string;
  };
}

export interface JournalEntry {
  id: JournalEntryID; // index
  transactionID: TransactionID; // index
  walletID: WalletID; // index
  cookieQuantityDelta: number;
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
