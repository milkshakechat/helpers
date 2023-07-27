import {
  ChatLogID,
  ChatRoomID,
  SendBirdMessageID,
  TimestampFirestore,
  UserID,
} from "./base.types";

export enum SendBirdChannelType {
  GROUP = "GROUP",
  OPEN = "OPEN",
}

export enum ChannelTypeEnum {
  GROUP = "GROUP",
  OPEN = "OPEN",
  DIRECT = "DIRECT",
}

export type SendBirdChannelURL = string;

export enum ChatRoomParticipantStatus {
  FREE_TIER = "FREE_TIER",
  SENDBIRD_ALLOWED = "SENDBIRD_ALLOWED",
  EXPIRED = "EXPIRED",
}

export interface ChatRoom_Firestore {
  id: ChatRoomID;
  title: string;
  thumbnail: string;
  note: string;
  participants: {
    [key: UserID]: ChatRoomParticipantStatus;
  };
  type: ChannelTypeEnum;
  // WARNING! firestoreQuickCheckHash changes based on participants
  // search by quickCheckHash requires an exact string match based on all participants userIDs
  // firestoreQuickCheckHash is participantIDs.sort().join(",")
  // it allows us to quickly check in firestore if a chatroom exists between a set of users
  // this uses the userIDs to create a unique csv hash for the chatroom
  // it is possible to return more than 1 room
  firestoreQuickCheckHash: string;
  members: UserID[];
  admins: UserID[];
  // sendbird
  sendBirdChannelURL?: SendBirdChannelURL; // index
  sendBirdChannelType?: SendBirdChannelType;
  sendBirdPushNotifConfig?: SendBirdPushNotifConfig;
}

export interface ChatLog_Firestore {
  id: ChatLogID;
  message: string;
  userID: UserID;
  avatar: string;
  username: string;
  chatRoomID: ChatRoomID;
  readers: UserID[];
  createdAt: TimestampFirestore;
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

export interface PartialSendbirdChannel {
  name: string;
  channel_url: string;
  cover_url: string;
  custom_type: string;
  unread_message_count: number;
  data: any;
  is_distinct: boolean;
  is_public: boolean;
  is_super: boolean;
  is_ephemeral: boolean;
  is_access_code_required: boolean;
  member_count: number;
  joined_member_count: number;
  unread_mention_count: number;
  created_by: {
    user_id: string;
    nickname: string;
    profile_url: string;
    require_auth_for_profile_image: boolean;
  };
  members: {
    user_id: string;
    nickname: string;
    profile_url: string;
    is_active: boolean;
    is_online: boolean;
    last_seen_at: number;
    state: string;
  }[];
  last_message: any;
  message_survival_seconds: number;
  max_length_message: number;
  created_at: number;
  freeze: boolean;
}

export const SYSTEM_MESSAGE_USER_ID = "Groupchat";
