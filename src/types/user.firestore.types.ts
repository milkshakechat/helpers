import {
  UserID,
  sendBirdInternalUserID,
  WalletID,
  TimestampFirestore,
  FriendshipID,
  ThemeColorHex,
  Username,
} from "./base.types";

export interface User_Firestore {
  id: UserID; // index
  username: Username; // index
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

export enum FriendshipStatus {
  REQUESTED = "REQUESTED",
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED",
  BLOCKED = "BLOCKED",
  NONE = "NONE",
}
export interface Friendship_Firestore {
  id: FriendshipID; // index
  primaryUserID: UserID; // index
  friendID: UserID;
  friendNickname: string;
  note: string;
  createdAt: TimestampFirestore;
  utmAttribution?: string;
  status: FriendshipStatus;
  initiatedBy: UserID;
  requestNonce: number;
}

export enum localeEnum {
  english = "english",
  japanese = "japanese",
  spanish = "spanish",
  arabic = "arabic",
  korean = "korean",
  chinese = "chinese",
  thai = "thai",
  vietnamese = "vietnamese",
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
