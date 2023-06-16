import { privacyModeEnum } from "../types/user.firestore.types";

export const PrivacySettingsExplaination = {
  [privacyModeEnum.public]:
    "Public profiles can receive messages from anyone and your username is visible to everyone.",
  [privacyModeEnum.private]:
    "Private profiles can only receive messages from accepted friends. You can still be found by your username.",
  [privacyModeEnum.hidden]:
    "Hidden profiles cannot be found by username. You must add friends to receive messages, or use a special private invite link.",
};
