import { NotificationID, TimestampFirestore, UserID } from "./base.types";

export interface Notification_Firestore {
  id: NotificationID; // index
  message: string;
  thumbnail: string;
  recipientID: UserID; // index
  metadataNote: string; // internal message only, about the origin of this notification
  isPushNotification: boolean; // not all notifications will go to push
  createdAt: TimestampFirestore;
}
