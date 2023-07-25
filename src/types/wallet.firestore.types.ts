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
  MirrorTransactionID,
  MirrorWalletAliasID,
  TxRefID,
  StripeProductID,
  StripePriceID,
  StripeSubItemID,
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

export const checkIfTradingWallet = (walletAliasID?: WalletAliasID) => {
  if (!walletAliasID) {
    throw new Error("walletAliasID provided is undefined");
  }
  return walletAliasID.includes("_main-trading-wallet");
};

export const checkIfStoreWallet = (walletAliasID?: WalletAliasID) => {
  if (!walletAliasID) {
    throw new Error("walletAliasID provided is undefined");
  }
  return walletAliasID.includes("_store-wallet");
};

export const checkIfEscrowWallet = (walletAliasID?: WalletAliasID) => {
  if (!walletAliasID) {
    throw new Error("walletAliasID provided is undefined");
  }
  return walletAliasID.includes("_main-escrow-wallet");
};

export const generateGlobalStoreAliasID = () => {
  // const id = uuidv4();
  const id = "milkshake-v0.1";
  return `${id}_store-wallet` as WalletAliasID;
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

// used for frontend to show realtime wallet balances
export interface Wallet_MirrorFireLedger {
  id: WalletAliasID; // index
  walletAliasID: WalletAliasID;
  title: string;
  balance: number;
  ownerID: UserID;
  type: WalletType;
}
export const getMirrorTransactionID = ({
  txID,
  walletAliasID,
}: {
  txID: TransactionID;
  walletAliasID: WalletAliasID;
}) => {
  return `${txID}.${walletAliasID}` as MirrorTransactionID;
};
export interface Tx_MirrorFireLedger {
  id: MirrorTransactionID; // index
  walletAliasID: WalletAliasID; // index
  txID: TransactionID;
  note: string;
  amount: number;
  type: TransactionType;
  createdAt: TimestampFirestore;
  sendingWallet: WalletAliasID;
  recievingWallet: WalletAliasID;
  senderUserID: UserID;
  recieverUserID: UserID;
  ownerID: UserID;
  purchaseManifestID?: PurchaseMainfestID;
  recallTransactionID?: MirrorTransactionID;
  cashOutTransactionID?: MirrorTransactionID;
  referenceID?: TxRefID;
}

// a log of every wish bought/sold by a user
// subscriptions appear as just 1 wish deal
// one time sales appear as 1 wish deal
// cookie transfers do NOT appear as a wish deal
// this is primarily for the user to see a summary of their past purchases
export interface PurchaseMainfest_Firestore {
  // basic info
  id: PurchaseMainfestID;
  title: string;
  note: string;
  buyerNote?: string;
  createdAt: TimestampFirestore;
  wishID: WishID; // index
  thumbnail: string;
  // foriegn keys
  buyerUserID: UserID; // index
  sellerUserID: UserID; // index
  // foreign keys
  buyerWallet: WalletAliasID; // index
  escrowWallet: WalletAliasID; // index
  // wish details
  agreedCookiePrice: number;
  originalCookiePrice: number;
  transactionType: TransactionType;
  // confirmation
  paymentComplete: boolean;
  referenceID: TxRefID;
  // subscription details
  agreedBuyFrequency: WishBuyFrequency;
  originalBuyFrequency: WishBuyFrequency;
  // prorated
  assumedMonthlyCookiePrice: number;
  assumedMonthlyUSDPrice: number;
  // recall
  isCancelled: boolean;
  cancelledAt?: TimestampFirestore;
  cancelledBy?: UserID;
  // stripe
  stripeProductID?: StripeProductID;
  stripePriceID?: StripePriceID;
  stripeSubItemID?: StripeSubItemID;
  stripePaymentIntentID?: StripePaymentIntentID;
  priceUSDPerFrequency?: number;
  priceUSDBasisAsMonthly?: number;
  priceCookiePerFrequency?: number;
  priceCookieAsMonthly?: number;
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
  gotRecalled: boolean; // reverted means return or recalled. default is false, but if ever recalled/returned this will become true. allows us to prevent double reversals
  gotCashOut: boolean; // redeemed means the money left escrow
  recallTransactionID?: TransactionID;
  cashOutTransactionID?: TransactionID;
  metadata: TransactionMetadata;
}

export enum TransactionType {
  DEAL = "DEAL", // when a user buys a wish
  RECALL = "RECALL", // when a user recalls a wish
  TRANSFER = "TRANSFER", // when a user transfers cookies to another user
  TOP_UP = "TOP_UP", // when a user buys cookies from the house to top up their wallet
  CASH_OUT = "CASH_OUT", // when a user cashes out their cookies
}

export interface TransactionMetadata {
  transactionID: TransactionID;
  salesMetadata?: TxSalesMetadata | null;
  recallMetadata?: TxRecallMetadata | null;
  transferMetadata?: TxTransferMetadata | null;
  topUpMetadata?: TxTopUpMetadata | null;
  cashOutMetadata?: TxCashOutMetadata | null;
}

export interface TxSalesMetadata {
  buyerNote: string;
  promoCode?: string;
  // deal details
  agreedCookiePrice: number;
  originalCookiePrice: number;
  agreedBuyFrequency: WishBuyFrequency;
  originalBuyFrequency: WishBuyFrequency;
}

export interface TxRecallMetadata {
  originalTransactionID: TransactionID;
  recallerWalletID: WalletAliasID;
  recallerNote: string;
}

export interface TxTransferMetadata {
  senderNote: string;
}

export interface TxTopUpMetadata {
  internalNote: string;
  promoCode?: string;
}

export interface TxCashOutMetadata {
  initiatorWallet: WalletAliasID;
  originalTransactionID: TransactionID;
  cashoutCode?: string;
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

export const convertFrequencySubscriptionToMonthly = (args: {
  amount: number;
  frequency: WishBuyFrequency;
}) => {
  // convert freqencies to monthly equivalent
  const { amount, frequency } = args;
  let monthlyAmount = 0;
  switch (frequency) {
    case WishBuyFrequency.DAILY:
      monthlyAmount = amount * 30;
      break;
    case WishBuyFrequency.WEEKLY:
      monthlyAmount = amount * 4.3;
      break;
    case WishBuyFrequency.MONTHLY:
      monthlyAmount = amount;
      break;
    case WishBuyFrequency.ONE_TIME:
      monthlyAmount = 0;
      break;
    default:
      throw Error(`Invalid frequency ${frequency}`);
  }
  return Math.ceil(monthlyAmount);
};
