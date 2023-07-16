import { PurchaseMainfestID, UserID, WalletAliasID } from "../types/base.types";
import {
  WalletType,
  Wallet_Quantum,
  UserRelationshipHash,
  Transaction_Quantum,
  TransactionType,
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
  explanations: {
    walletAliasID: WalletAliasID;
    explanation: string;
    amount: number;
  }[];
  dealMetadata?: {
    buyerNote: string;
    promoCode?: string;
    // deal details
    agreedCookiePrice: number;
    originalCookiePrice: number;
    agreedBuyFrequency: WishBuyFrequency;
    originalBuyFrequency: WishBuyFrequency;
  };
  transferMetadata?: {
    senderNote: string;
  };
  topUpMetadata?: {
    internalNote: string;
    promoCode?: string;
  };
}
export interface PostTransactionXCloudResponse {
  statusCode: 200;
  body: string; // JSON.parse(body) = PostTransactionXCloudResponseBody
}
export interface PostTransactionXCloudResponseBody {
  message: string;
  transaction: Transaction_Quantum;
}

// ---- Post Refund ---- //
export interface PostRefundXCloudRequestBody {
  //
}
export interface PostRefundXCloudResponse {
  statusCode: 200;
  body: string; // JSON.parse(body) = PostRefundXCloudResponseBody
}
export interface PostRefundXCloudResponseBody {
  message: string;
  refund: Transaction_Quantum;
}
