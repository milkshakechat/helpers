import { TimestampFirestore } from "../types/base.types";

export const RECALL_GRACE_PERIOD_DAYS = 90;
export const checkIfRecallable = (firestoreTimestamp: TimestampFirestore) => {
  const now = Date.now();
  const timestamp = (firestoreTimestamp as any).seconds * 1000;

  const diff = now - timestamp;
  const remaining = 1000 * 60 * 60 * 24 * RECALL_GRACE_PERIOD_DAYS;

  const recallable = diff < remaining;
  return recallable;
};
export const checkIfCashOutAble = (firestoreTimestamp: TimestampFirestore) => {
  const now = Date.now();
  const timestamp = (firestoreTimestamp as any).seconds * 1000;
  const days = 1000 * 60 * 60 * 24 * RECALL_GRACE_PERIOD_DAYS;
  const total = timestamp + days;
  const cashOutAble = total < now;
  return cashOutAble;
};
