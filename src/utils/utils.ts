import { TimestampFirestore } from "../types/base.types";

export const RECALL_GRACE_PERIOD_DAYS = 90;
export const checkIfRecallable = (firestoreTimestamp: TimestampFirestore) => {
  const now = Date.now();
  console.log("now", now);
  console.log("firestoreTimestamp", firestoreTimestamp);
  const timestamp = (firestoreTimestamp as any).seconds * 1000;
  console.log("timestamp", timestamp);
  const diff = now - timestamp;
  const remaining = 1000 * 60 * 60 * 24 * RECALL_GRACE_PERIOD_DAYS;
  console.log(`time diff = ${diff} vs remaining = ${remaining}`);
  const recallable = diff < remaining;
  return recallable;
};
