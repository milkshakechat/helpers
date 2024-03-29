import {
  ChatRoomID,
  NotificationID,
  NotificationTopicID,
  PushMessageRecieptID,
  PushTokenID,
  TimestampFirestore,
  UserID,
} from "./base.types";

export interface Notification_Firestore {
  id: NotificationID; // index
  recipientID: UserID; // index
  title: string;
  body?: string;
  image?: string;
  route?: string; // route to navigate to when clicked
  topic?: NotificationTopicID; // topic that was subscribed to
  metadataNote: string; // internal message only, about the origin of this notification
  createdAt: TimestampFirestore;
  markedRead: boolean; // set to true when user clicks on notification or views it
  pushMessageRecieptIDs?: PushMessageRecieptID[]; // returned from firebase push fcm after successful message send. use this to match to historical push notifications
  relatedChatRoomID?: ChatRoomID; // if this notification is related to a chat room
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

export const DEFAULT_PUSH_NOTIFICATION_IMAGE =
  "https://firebasestorage.googleapis.com/v0/b/milkshake-dev-faf77.appspot.com/o/app-public-shared%2Fmilkshake_fcm_icon.jpg?alt=media";
export type ValidClientAppRoute = string;
export interface PushNotificationShape {
  data: {
    title: string;
    body: string;
    image?: string;
    icon?: string; // icon="https://firebasestorage.googleapis.com/v0/b/milkshake-dev-faf77.appspot.com/o/app-public-shared%2Fmilkshake_fcm_icon.jpg?alt=media";
    route: ValidClientAppRoute; // eg: "/app/chats/123"";
  };
}
export interface PushNotificationPackage extends PushNotificationShape {
  to: PushTokenID;
}
