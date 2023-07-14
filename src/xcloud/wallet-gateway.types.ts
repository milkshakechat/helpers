import { UserID } from "../types/base.types";
import { WalletType, Wallet_Quantum } from "../types/wallet.firestore.types";

export interface CreateWalletXCloudRequestBody {
  title: string;
  userRelationshipHash: string;
  note: string;
  userID: UserID;
  type: WalletType;
}

export interface CreateWalletXCloudResponse {
  statusCode: 200;
  body: string; // JSON.parse(body) = GetWalletXCloudResponseBody
}
export interface GetWalletXCloudResponseBody {
  message: string;
  wallet: Wallet_Quantum;
}

export const getMainUserTradingWallet = (userID: UserID) => {
  return `${userID}_main-trading-wallet`;
};

export const getUserUserEscrowWallet = (userIDs: UserID[]) => {
  return `${userIDs.join(".")}_escrow-wallet`;
};
