import {
  UserID,
  SendBirdUserID,
  WalletAliasID,
  TimestampFirestore,
  FriendshipID,
  ThemeColorHex,
  Username,
  SendBirdAccessToken,
  StripeCustomerID,
  StripeSubscriptionID,
  StripeMerchantID,
  StripePaymentMethodID,
  MockUserGenesisID,
  GeoInfo,
  GoogleMapsPlaceID,
  GeoFireX,
} from "./base.types";
import { CurrencyEnum } from "./wallet.firestore.types";
import { GeoPoint } from "firebase-admin/firestore";

export interface User_Firestore {
  id: UserID; // index
  username: Username; // index
  // basic
  displayName: string;
  bio: string;
  avatar: string;
  link: string;
  createdAt: TimestampFirestore;
  // contact
  email: string;
  phone: string;
  // wallet
  tradingWallet: WalletAliasID;
  escrowWallet: WalletAliasID;
  // sendbird
  sendBirdUserID?: SendBirdUserID;
  isPaidChat: boolean;
  isPaidChatUntil?: TimestampFirestore;
  sendBirdAccessToken?: SendBirdAccessToken;
  // settings
  privacyMode: privacyModeEnum;
  themeColor: ThemeColorHex;
  language: localeEnum;
  usernameLastUpdated: TimestampFirestore;
  // interests
  gender: genderEnum;
  interestedIn: genderEnum[];
  prefAboutMe: string;
  prefLookingFor: string;
  prefGeoBias: Boolean;
  // banking
  isCreator: boolean;
  currency?: CurrencyEnum;
  stripeMetadata?: StripeMetadata_UserFirestore;
  // geolocation
  geoInfo?: GeoInfo;
  geoFireX?: GeoFireX;
  // internal admin
  isMockUser?: boolean;
  disabled: boolean;
}

export interface MirrorPublicUser_Firestore {
  id: UserID; // index
  username: Username;
  avatar: string;
  hasPremiumChat: boolean;
}

export interface MockUser_Firestore {
  id: UserID; // index
  email: string;
  username: Username;
  password: string;
  genesisID: MockUserGenesisID;
  lastKnownToken?: string;
}

// exists on User_Firestore
export interface StripeMetadata_UserFirestore {
  // stripe foreign keys
  stripeCustomerID?: StripeCustomerID;
  stripeCustomerSubscriptionID?: StripeSubscriptionID;
  stripeMerchantID?: StripeMerchantID;
  hasMerchantPrivilege: boolean;
  defaultPaymentMethodID?: StripePaymentMethodID;
}

export enum genderEnum {
  male = "male",
  female = "female",
  other = "other",
  unknown = "unknown",
}

export enum FriendshipStatus {
  ACQUAINTANCE = "ACQUAINTANCE",
  SENT_REQUEST = "SENT_REQUEST",
  GOT_REQUEST = "GOT_REQUEST",
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
  username: Username;
  avatar: string;
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

export enum privacyModeEnum {
  public = "public",
  private = "private",
  hidden = "hidden",
}

export const defaultThemeColorHex = "#2EB8F6" as ThemeColorHex;
