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
  ChatRoomID,
} from "./base.types";
import { localeEnum } from "./user.firestore.types";
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
  currency: CurrencyEnum;
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
  isPermaTransfer?: boolean;
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
  // social
  chatRoomID?: ChatRoomID;
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
  isPermaTransfer?: boolean;
}

export enum TransactionType {
  DEAL = "DEAL", // when a user buys a wish
  RECALL = "RECALL", // when a user recalls a wish
  TRANSFER = "TRANSFER", // when a user transfers cookies to another user
  TOP_UP = "TOP_UP", // when a user buys cookies from the house to top up their wallet
  CASH_OUT = "CASH_OUT", // when a user cashes out their cookies
  PREMIUM_CHAT = "PREMIUM_CHAT", // when a user buys a premium chat
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
  isPermaTransfer?: boolean;
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

export enum CurrencyEnum {
  USD = "USD",
  EUR = "EUR",
  JPY = "JPY",
  GBP = "GBP",
  AUD = "AUD",
  CAD = "CAD",
  ARS = "ARS",
  BHD = "BHD",
  BRL = "BRL",
  CLP = "CLP",
  CNY = "CNY",
  COP = "COP",
  EGP = "EGP",
  HKD = "HKD",
  INR = "INR",
  IDR = "IDR",
  ILS = "ILS",
  KES = "KES",
  KRW = "KRW",
  CHF = "CHF",
  MYR = "MYR",
  MXN = "MXN",
  NZD = "NZD",
  NGN = "NGN",
  PKR = "PKR",
  PHP = "PHP",
  QAR = "QAR",
  RUB = "RUB",
  SAR = "SAR",
  SGD = "SGD",
  THB = "THB",
  ZAR = "ZAR",
  NTD = "NTD",
  TRY = "TRY",
  UAH = "UAH",
  AED = "AED",
  VND = "VND",
  PLN = "PLN",
  BDT = "BDT",
}

export const mapCurrencyEnumToName: Record<CurrencyEnum, string> = {
  [CurrencyEnum.USD]: "$ US Dollar",
  [CurrencyEnum.EUR]: "€ Euro",
  [CurrencyEnum.JPY]: "¥ Japanese Yen",
  [CurrencyEnum.GBP]: "£ British Pound",
  [CurrencyEnum.AUD]: "$ Australian Dollar",
  [CurrencyEnum.CAD]: "$ Canadian Dollar",
  [CurrencyEnum.ARS]: "$ Argentine Peso",
  [CurrencyEnum.BHD]: "BHD Bahraini Dinar",
  [CurrencyEnum.BRL]: "R$ Brazilian Real",
  [CurrencyEnum.CLP]: "$ Chilean Peso",
  [CurrencyEnum.CNY]: "¥ Chinese Yuan",
  [CurrencyEnum.COP]: "$ Colombian Peso",
  [CurrencyEnum.EGP]: "EGP Egyptian Pound",
  [CurrencyEnum.HKD]: "$ Hong Kong Dollar",
  [CurrencyEnum.INR]: "₹ Indian Rupee",
  [CurrencyEnum.IDR]: "Rp Indonesian Rupiah",
  [CurrencyEnum.ILS]: "₪ Israeli New Shekel",
  [CurrencyEnum.KES]: "KES Kenyan Shilling",
  [CurrencyEnum.KRW]: "₩ South Korean Won",
  [CurrencyEnum.CHF]: "CHF Swiss Franc",
  [CurrencyEnum.MYR]: "RM Malaysian Ringgit",
  [CurrencyEnum.MXN]: "$ Mexican Peso",
  [CurrencyEnum.NZD]: "$ New Zealand Dollar",
  [CurrencyEnum.NGN]: "₦ Nigerian Naira",
  [CurrencyEnum.PKR]: "₨ Pakistani Rupee",
  [CurrencyEnum.PHP]: "₱ Philippine Peso",
  [CurrencyEnum.QAR]: "QAR Qatari Riyal",
  [CurrencyEnum.RUB]: "₽ Russian Ruble",
  [CurrencyEnum.SAR]: "SAR Saudi Riyal",
  [CurrencyEnum.SGD]: "$ Singapore Dollar",
  [CurrencyEnum.THB]: "฿ Thai Baht",
  [CurrencyEnum.ZAR]: "ZAR South African Rand",
  [CurrencyEnum.NTD]: "NT$ New Taiwan Dollar",
  [CurrencyEnum.TRY]: "TRY Turkish Lira",
  [CurrencyEnum.UAH]: "₴ Ukrainian Hryvnia",
  [CurrencyEnum.AED]: "AED United Arab Emirates Dirham",
  [CurrencyEnum.VND]: "₫ Vietnamese Dong",
  [CurrencyEnum.PLN]: "PLN Polish Zloty",
  [CurrencyEnum.BDT]: "BDT Bangladeshi Taka",
};

export const mapLanguageLocalToAssumedCurrency = (lang: localeEnum) => {
  switch (lang) {
    case localeEnum.english:
      return CurrencyEnum.USD;
    case localeEnum.japanese:
      return CurrencyEnum.JPY;
    case localeEnum.korean:
      return CurrencyEnum.KRW;
    case localeEnum.french:
      return CurrencyEnum.EUR;
    case localeEnum.arabic:
      return CurrencyEnum.AED;
    case localeEnum.german:
      return CurrencyEnum.EUR;
    case localeEnum.italian:
      return CurrencyEnum.EUR;
    case localeEnum.spanish:
      return CurrencyEnum.MXN;
    case localeEnum.chinese:
      return CurrencyEnum.CNY;
    case localeEnum.hindi:
      return CurrencyEnum.INR;
    case localeEnum.polish:
      return CurrencyEnum.PLN;
    case localeEnum.turkish:
      return CurrencyEnum.TRY;
    case localeEnum.thai:
      return CurrencyEnum.THB;
    case localeEnum.vietnamese:
      return CurrencyEnum.VND;
    case localeEnum.russian:
      return CurrencyEnum.RUB;
    case localeEnum.portuguese:
      return CurrencyEnum.BRL;
    case localeEnum.tagalog:
      return CurrencyEnum.PHP;
    case localeEnum.indonesian:
      return CurrencyEnum.IDR;
    case localeEnum.ukrainian:
      return CurrencyEnum.UAH;
    case localeEnum.bengali:
      return CurrencyEnum.BDT;
    case localeEnum.malaysian:
      return CurrencyEnum.MYR;
    case localeEnum.urdu:
      return CurrencyEnum.PKR;
    default:
      return CurrencyEnum.USD;
  }
};

export const mapCurrencyEnumToSymbol = (curr: CurrencyEnum) => {
  switch (curr) {
    case CurrencyEnum.USD:
      return "$";
    case CurrencyEnum.EUR:
      return "€";
    case CurrencyEnum.JPY:
      return "¥";
    case CurrencyEnum.GBP:
      return "£";
    case CurrencyEnum.AUD:
      return "$";
    case CurrencyEnum.CAD:
      return "$";
    case CurrencyEnum.ARS:
      return "$";
    case CurrencyEnum.BHD:
      return "";
    case CurrencyEnum.BRL:
      return "R$";
    case CurrencyEnum.CLP:
      return "$";
    case CurrencyEnum.CNY:
      return "¥";
    case CurrencyEnum.COP:
      return "$";
    case CurrencyEnum.EGP:
      return "";
    case CurrencyEnum.HKD:
      return "$";
    case CurrencyEnum.INR:
      return "₹";
    case CurrencyEnum.IDR:
      return "Rp";
    case CurrencyEnum.ILS:
      return "₪";
    case CurrencyEnum.KES:
      return "";
    case CurrencyEnum.KRW:
      return "₩";
    case CurrencyEnum.CHF:
      return "";
    case CurrencyEnum.MYR:
      return "RM";
    case CurrencyEnum.MXN:
      return "$";
    case CurrencyEnum.NZD:
      return "$";
    case CurrencyEnum.NGN:
      return "₦";
    case CurrencyEnum.PKR:
      return "₨";
    case CurrencyEnum.PHP:
      return "₱";
    case CurrencyEnum.QAR:
      return "";
    case CurrencyEnum.RUB:
      return "₽";
    case CurrencyEnum.SAR:
      return "";
    case CurrencyEnum.SGD:
      return "$";
    case CurrencyEnum.THB:
      return "฿";
    case CurrencyEnum.ZAR:
      return "";
    case CurrencyEnum.NTD:
      return "$";
    case CurrencyEnum.TRY:
      return "";
    case CurrencyEnum.UAH:
      return "₴";
    case CurrencyEnum.AED:
      return "";
    case CurrencyEnum.VND:
      return "₫";
    case CurrencyEnum.PLN:
      return "";
    case CurrencyEnum.BDT:
      return "";
    default:
      return "";
  }
};

export const currencyEnumToDecimalPlaces = (curr: CurrencyEnum) => {
  switch (curr) {
    case CurrencyEnum.USD:
      return 2;
    case CurrencyEnum.EUR:
      return 2;
    case CurrencyEnum.JPY:
      return 0;
    case CurrencyEnum.GBP:
      return 2;
    case CurrencyEnum.AUD:
      return 2;
    case CurrencyEnum.CAD:
      return 2;
    case CurrencyEnum.ARS:
      return 2;
    case CurrencyEnum.BHD:
      return 2;
    case CurrencyEnum.BRL:
      return 2;
    case CurrencyEnum.CLP:
      return 0;
    case CurrencyEnum.CNY:
      return 0;
    case CurrencyEnum.COP:
      return 1;
    case CurrencyEnum.EGP:
      return 1;
    case CurrencyEnum.HKD:
      return 1;
    case CurrencyEnum.INR:
      return 0;
    case CurrencyEnum.IDR:
      return 0;
    case CurrencyEnum.ILS:
      return 1;
    case CurrencyEnum.KES:
      return 1;
    case CurrencyEnum.KRW:
      return 0;
    case CurrencyEnum.CHF:
      return 1;
    case CurrencyEnum.MYR:
      return 0;
    case CurrencyEnum.MXN:
      return 1;
    case CurrencyEnum.NZD:
      return 2;
    case CurrencyEnum.NGN:
      return 0;
    case CurrencyEnum.PKR:
      return 0;
    case CurrencyEnum.PHP:
      return 0;
    case CurrencyEnum.QAR:
      return 2;
    case CurrencyEnum.RUB:
      return 0;
    case CurrencyEnum.SAR:
      return 2;
    case CurrencyEnum.SGD:
      return 2;
    case CurrencyEnum.THB:
      return 0;
    case CurrencyEnum.ZAR:
      return 0;
    case CurrencyEnum.NTD:
      return 0;
    case CurrencyEnum.TRY:
      return 0;
    case CurrencyEnum.UAH:
      return 0;
    case CurrencyEnum.AED:
      return 2;
    case CurrencyEnum.VND:
      return 0;
    case CurrencyEnum.PLN:
      return 2;
    case CurrencyEnum.BDT:
      return 2;
    default:
      return 2;
  }
};

export const fxFromUSDToCurrency = ({
  amount,
  fxRate,
  currency,
}: {
  amount: number;
  fxRate: number;
  currency: CurrencyEnum;
}) => {
  return (amount * fxRate).toFixed(currencyEnumToDecimalPlaces(currency));
};
