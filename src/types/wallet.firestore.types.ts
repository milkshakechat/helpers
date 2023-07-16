import {
  CookieSaleID,
  GiftCardSaleID,
  StickerSaleID,
  WalletAliasID,
  TimestampFirestore,
  TransactionID,
  UserID,
  WishlistID,
  WishID,
  StripeMerchantID,
  StripeCustomerID,
  CardChargeID,
  PurchaseMainfestID,
  StripePaymentIntentID,
  StripeSubscriptionID,
  WalletID,
} from "./base.types";
import { WishBuyFrequency } from "./wishlist.firestore.types";
import { v4 as uuidv4 } from "uuid";

// user can spend this money
export const getMainUserTradingWallet = (userID: UserID) => {
  return `${userID}_main-trading-wallet` as WalletAliasID;
};

// user receives money here but cannot spend it for 90 days
export const getUserEscrowWallet = (userID: UserID) => {
  return `${userID}_main-escrow-wallet` as WalletAliasID;
};

export const checkIfTradingWallet = (walletAliasID: WalletAliasID) => {
  return walletAliasID.includes("_main-trading-wallet");
};

export const generateGlobalStoreAliasID = () => {
  const id = uuidv4();
  return `global-store-${id}` as WalletAliasID;
};

export enum QuantumLedgerNames {
  WALLET = "WALLET",
  TRANSACTION = "TRANSACTION",
}

export type QuantumLedgerDate = Date;
export interface Wallet_Quantum {
  // base info
  id: WalletID;
  walletAliasID: WalletAliasID; // index and alias
  ownerID: UserID; // index
  title: string;
  note: string;
  createdAt: QuantumLedgerDate;
  balance: number;
  type: WalletType;
  isLocked: boolean;
  mostRecentTransactionID?: TransactionID;
}

export enum WalletType {
  TRADING = "TRADING",
  ESCROW = "ESCROW",
  STORE = "STORE",
}

// created every time a credit card is charged by Stripe
// could be one-time payment, or subscription payment webhook
export interface CardCharge_Firestore {
  id: CardChargeID; // index
  userID: UserID; // index
  stripeCustomerID?: StripeCustomerID;
  amount: number;
  currency: string;
  source: string;
  createdAt: TimestampFirestore;
  wishDealSnapshot: PurchaseMainfestID[];
  stripePaymentIntentID?: StripePaymentIntentID;
  stripeSubscriptionID?: StripeSubscriptionID;
}

// a log of every wish bought/sold by a user
// subscriptions appear as just 1 wish deal
// one time sales appear as 1 wish deal
// cookie transfers do NOT appear as a wish deal
// this is primarily for the user to see a summary of their past purchases
export interface PurchaseMainfest_Firestore {
  // basic info
  id: PurchaseMainfestID;
  note: string;
  createdAt: TimestampFirestore;
  wishID: WishID; // index
  // foriegn keys
  buyerUserID: UserID; // index
  sellerUserID: UserID; // index
  // foreign keys
  buyerWalletID: WalletAliasID; // index
  escrowWalletID?: WalletAliasID; // index
  // wish details
  agreedCookiePrice: number;
  originalCookiePrice: number;
  // subscription details
  agreedBuyFrequency: WishBuyFrequency;
  originalBuyFrequency: WishBuyFrequency;
  // recall
  isCancelled: boolean;
  cancelledAt?: TimestampFirestore;
  cancelledBy?: UserID;
}

export type UserRelationshipHash = string; // hash = [userID].sort().join("-")

// created every time a user transacts with cookies
// this can be independent of CardCharges
export interface Transaction_Quantum {
  // base info
  id: TransactionID; // index
  title: string;
  note: string;
  createdAt: QuantumLedgerDate;
  // foriegn keys
  sendingWallet: WalletAliasID; // trading wallet
  recievingWallet: WalletAliasID; // escrow wallet
  purchaseManifestID?: PurchaseMainfestID;
  // archive log with pov (may include future creditors such as club boss)
  explanations: {
    [key: WalletAliasID]: {
      walletAliasID: WalletAliasID;
      explanation: string;
      amount: number;
    };
  };
  // transaction details
  amount: number;
  type: TransactionType;
  attribution?: string;
  gotReverted: boolean; // reverted means return or recalled. default is false, but if ever recalled/returned this will become true. allows us to prevent double reversals
  revertedTransactionID?: TransactionID;
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

// this is not an exact type, just a reference representato of the QLDB history diff
// todo: turn this into a real type
export interface JournalEntry_Quantum {
  // id: this comes from QLDB History of Wallet_Quantum
  transactionID: TransactionID;
  wallet: WalletAliasID;
  cookieQuantityDelta: number;
  updatedAt: TimestampFirestore;
}
