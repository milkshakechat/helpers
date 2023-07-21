import {
  PurchaseMainfestID,
  TransactionID,
  TxRefID,
  UserID,
  WalletAliasID,
} from "../types/base.types";
import {
  WalletType,
  Wallet_Quantum,
  UserRelationshipHash,
  Transaction_Quantum,
  TransactionType,
  TxSalesMetadata,
  TxRecallMetadata,
  TxTransferMetadata,
  TxTopUpMetadata,
  TxCashOutMetadata,
} from "../types/wallet.firestore.types";
import { WishBuyFrequency } from "../types/wishlist.firestore.types";

// ---- Create Wallet ---- //
export interface CreateWalletXCloudRequestBody {
  title: string;
  note: string;
  userID: UserID;
  type: WalletType;
  walletAliasID: WalletAliasID;
}
export interface CreateWalletXCloudResponse {
  statusCode: 200;
  body: string; // JSON.parse(body) = CreateWalletXCloudResponseBody
}
export interface CreateWalletXCloudResponseBody {
  message: string;
  wallet: Wallet_Quantum;
}

// ---- Get Wallet ---- //
export interface GetWalletXCloudRequestBody {
  walletAliasID: WalletAliasID;
}
export interface GetWalletXCloudResponse {
  statusCode: 200;
  body: string; // JSON.parse(body) = GetWalletXCloudResponseBody
}
export interface GetWalletXCloudResponseBody {
  message: string;
  wallet: Wallet_Quantum;
}

// ---- Update Wallet ---- //
export interface UpdateWalletXCloudRequestBody {
  walletAliasID: WalletAliasID;
  title?: string;
  note?: string;
}
export interface UpdateWalletXCloudResponse {
  statusCode: 200;
  body: string; // JSON.parse(body) = UpdateWalletXCloudResponse
}
export interface UpdateWalletXCloudResponseBody {
  message: string;
  wallet: Wallet_Quantum;
}

// ---- Post Transaction ---- //
export interface PostTransactionXCloudRequestBody {
  //
  title: string;
  note: string;
  purchaseManifestID?: PurchaseMainfestID;
  attribution?: string;
  type: TransactionType;
  amount: number;
  senderWallet: WalletAliasID;
  receiverWallet: WalletAliasID;
  senderUserID: UserID;
  receiverUserID: UserID;
  explanations: {
    walletAliasID: WalletAliasID;
    explanation: string;
    amount: number;
  }[];
  gotRecalled?: boolean;
  gotCashOut?: boolean;
  recallTransactionID?: TransactionID;
  cashOutTransactionID?: TransactionID;
  salesMetadata?: TxSalesMetadata;
  recallMetadata?: TxRecallMetadata;
  transferMetadata?: TxTransferMetadata;
  topUpMetadata?: TxTopUpMetadata;
  cashOutMetadata?: TxCashOutMetadata;
  referenceID?: TxRefID;
}
export interface PostTransactionXCloudResponse {
  statusCode: 200;
  body: string; // JSON.parse(body) = PostTransactionXCloudResponseBody
}
export interface PostTransactionXCloudResponseBody {
  message: string;
  transaction: Transaction_Quantum;
}

// ---- Get Transaction ---- //
export interface GetTransactionXCloudRequestBody {
  transactionID: TransactionID;
}
export interface GetTransactionXCloudResponse {
  statusCode: 200;
  body: string; // JSON.parse(body) = RecallTransactionXCloudResponseBody
}
export interface GetTransactionXCloudResponseBody {
  message: string;
  transaction: Transaction_Quantum;
}

// ---- Recall Transaction ---- //
export interface RecallTransactionXCloudRequestBody {
  transactionID: TransactionID;
  recallerWalletID: WalletAliasID;
  recallerNote: string;
  referenceID?: TxRefID;
}
export interface RecallTransactionXCloudResponse {
  statusCode: 200;
  body: string; // JSON.parse(body) = RecallTransactionXCloudResponseBody
}
export interface RecallTransactionXCloudResponseBody {
  message: string;
  transaction: Transaction_Quantum;
}

// ---- Cash Out ---- //
export interface CashOutXCloudRequestBody {
  transactionID: TransactionID;
  initiatorWallet: WalletAliasID;
  cashoutCode?: string;
  referenceID?: TxRefID;
}
export interface CashOutXCloudResponse {
  statusCode: 200;
  body: string; // JSON.parse(body) = CashOutXCloudResponseBody
}
export interface CashOutXCloudResponseBody {
  message: string;
  transaction: Transaction_Quantum;
}
