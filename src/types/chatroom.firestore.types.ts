import { ChatRoomID, UserID } from "./base.types";

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
  // WARNING! firestoreQuickCheckHash is only used for 1-on-1 chats
  // it breaks when you are able to invite more people to a chatroom
  // firestoreQuickCheckHash is participantIDs.sort().join(",")
  // it allows us to quickly check in firestore if a chatroom exists between a set of users
  // this uses the userIDs to create a unique csv hash for the chatroom
  firestoreQuickCheckHash?: string;
  sendBirdChannelURL?: SendBirdChannelURL;
  sendBirdChannelType?: SendBirdChannelType;
}
