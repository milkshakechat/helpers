import * as admin from "firebase-admin";

export const createFirestoreTimestamp = (date?: Date) => {
  const targetDate = date || new Date();
  const timestamp = admin.firestore.Timestamp.fromDate(targetDate);
  return timestamp;
};
