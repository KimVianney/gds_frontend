import { UseAddPopup } from "../state/application/hooks";
import { mkUseErrorMessages } from "../utils/useErrorMessages";

export function UseErrorMessages() {
  const addPopup = UseAddPopup();
  return mkUseErrorMessages(addPopup);
}
