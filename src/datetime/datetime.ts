import { Timestamp } from "firebase/firestore";

export const createFirestoreTimestamp = (date?: Date) => {
  const targetDate = date || new Date();
  const timestamp = Timestamp.fromDate(targetDate);
  return timestamp;
};
