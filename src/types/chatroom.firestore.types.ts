import {
  ChatRoomID,
  SendBirdMessageID,
  TimestampFirestore,
  UserID,
} from "./base.types";

export enum SendBirdChannelType {
  GROUP = "GROUP",
  OPEN = "OPEN",
}

export type SendBirdChannelURL = string;

export enum ChatRoomParticipantStatus {
  FREE_TIER = "FREE_TIER",
  SENDBIRD_ALLOWED = "SENDBIRD_ALLOWED",
  EXPIRED = "EXPIRED",
}

export interface ChatRoom_Firestore {
  id: ChatRoomID;
  note: string;
  participants: {
    [key: UserID]: ChatRoomParticipantStatus;
  };
  // WARNING! firestoreQuickCheckHash changes based on participants
  // search by quickCheckHash requires an exact string match based on all participants userIDs
  // firestoreQuickCheckHash is participantIDs.sort().join(",")
  // it allows us to quickly check in firestore if a chatroom exists between a set of users
  // this uses the userIDs to create a unique csv hash for the chatroom
  // it is possible to return more than 1 room
  firestoreQuickCheckHash: string;
  firestoreParticipantSearch: UserID[];
  // sendbird
  sendBirdChannelURL?: SendBirdChannelURL; // index
  sendBirdChannelType?: SendBirdChannelType;
  sendBirdPushNotifConfig?: SendBirdPushNotifConfig;
}

export const ChatRoomQuickCheckHashGen = (participants: UserID[]) => {
  return participants.sort().join(",");
};

export interface SendBirdPushNotifConfig {
  [key: UserID]: SendBirdPushNotifConfig_User;
}

export interface SendBirdPushNotifConfig_User {
  snoozeUntil: TimestampFirestore; // timestamp
  allowPush: boolean;
}
