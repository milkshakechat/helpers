import {
  StoryID,
  UserID,
  StoryAttachmentType,
  StoryAttachmentID,
  TimestampFirestore,
  TeaserMessageID,
  AudienceGroupID,
} from "./base.types";

export interface Story_Firestore {
  id: StoryID; // index
  title: string;
  userID: UserID; // index
  attachment: StoryAttachment_Firestore;
  pinned: boolean;
  public: boolean;
  visibleTimeline: boolean;
  visibleAudienceGroups: AudienceGroupID[];
  visibleFriends: UserID[];
  createdAt: TimestampFirestore;
  expiresAt: TimestampFirestore;
}

export interface StoryAttachment_Firestore {
  id: StoryAttachmentID; // index
  type: StoryAttachmentType;
  userID: UserID;
  mediaSet: MediaFile_Firestore[];
  title: string;
}

export interface MediaFile_Firestore {
  url: string;
  width: number;
  height: number;
  format: string;
  altText: string;
}

export interface TeaserMessage_Firestore {
  id: TeaserMessageID; // index
  senderID: UserID;
  receiverID: UserID; // index
  storyID?: StoryID;
  text: string;
  mediaSet: MediaFile_Firestore[];
  createdAt: TimestampFirestore;
  sentViaSendbird: boolean;
}

export interface AudienceGroup_Firestore {
  id: AudienceGroupID; // index
  title: string;
  ownerID: UserID; // index
  viewerIDs: UserID[];
  deleted: boolean;
}
