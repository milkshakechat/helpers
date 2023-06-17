import {
  UserID,
  sendBirdInternalUserID,
  WalletID,
  TimestampFirestore,
  FriendshipID,
  FriendRequestID,
  ThemeColorHex,
} from "./base.types";

export interface User_Firestore {
  id: UserID; // index
  username: string; // index
  displayName: string;
  bio: string;
  email: string;
  phone: string;
  avatar: string;
  link: string;
  isCreator: boolean;
  mainWalletID?: WalletID;
  sendBirdInternalUserID?: sendBirdInternalUserID;
  createdAt: TimestampFirestore;
  isPaidChat: boolean;
  isPaidChatUntil?: TimestampFirestore;
  disabled: boolean;
  privacyMode: privacyModeEnum;
  themeColor: ThemeColorHex;
  language: localeEnum;
  gender: genderEnum;
  usernameLastUpdated: TimestampFirestore;
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

export enum localeEnum {
  english = "english",
  japanese = "japanese",
  spanish = "spanish",
  korean = "korean",
  chinese = "chinese",
  thai = "thai",
  vietnamese = "vietnamese",
  // arabic = "arabic",
  // russian = "russian",
}

export enum genderEnum {
  male = "male",
  female = "female",
  other = "other",
}

export enum privacyModeEnum {
  public = "public",
  private = "private",
  hidden = "hidden",
}

export const defaultThemeColorHex = "#2EB8F6" as ThemeColorHex;
