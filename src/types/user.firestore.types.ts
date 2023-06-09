import {
  UserID,
  sendBirdInternalUserID,
  WalletID,
  TimestampFirestore,
  FriendshipID,
  FriendRequestID,
} from "./base.types";

export interface User_Firestore {
  id: UserID; // index
  username: string; // index
  displayName: string;
  bio: string;
  email: string;
  phone: string;
  isCreator: boolean;
  mainWalletID?: WalletID;
  sendBirdInternalUserID?: sendBirdInternalUserID;
  createdAt: TimestampFirestore;
  isPaidChat: boolean;
  isPaidChatUntil?: TimestampFirestore;
  disabled: boolean;
}

export interface Friendship_Firestore {
  id: FriendshipID; // index
  primaryUserID: UserID; // index
  friendID: UserID;
  nickname: string;
  hasBlockedFriend: boolean;
}

export interface FriendRequest_Firestore {
  id: FriendRequestID; // index
  initiatorID: UserID;
  recipientID: UserID; // index
  note: string;
  createdAt: TimestampFirestore;
  utmAttribution?: string;
  hasBeenAccepted: boolean;
}
