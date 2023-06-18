import {
  NotificationID,
  PushTokenID,
  TimestampFirestore,
  UserID,
} from "./base.types";

export interface Notification_Firestore {
  id: NotificationID; // index
  message: string;
  thumbnail: string;
  recipientID: UserID; // index
  metadataNote: string; // internal message only, about the origin of this notification
  isPushNotification: boolean; // not all notifications will go to push
  createdAt: TimestampFirestore;
}

export enum PushPlatformType {
  ios = "ios",
  firebase = "firebase",
  huawei = "huawei",
}
export interface PushToken_Firestore {
  id: PushTokenID; // index
  userID: UserID; // index
  token: PushTokenID; // will be same as id
  pushPlatformType: PushPlatformType;
  lastActive: TimestampFirestore;
  title: string;
  active: boolean;
}
