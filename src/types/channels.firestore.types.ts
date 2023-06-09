import { ChannelID } from "./base.types";

export enum SendBirdChannelType {
  GROUP = "GROUP",
  OPEN = "OPEN",
}

export type SendBirdChannelID = string & {
  readonly _: unique symbol;
};

export interface Channel_Firestore {
  id: ChannelID;
  note: string;
  sendBirdChannelURL: string;
  sendBirdChannelType: SendBirdChannelType;
  sendBirdChannelID: SendBirdChannelID;
}
