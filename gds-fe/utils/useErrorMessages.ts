import { useCallback } from "react";
import logger from "../logger";
import { AddPopup, PopupType } from "../types/PopUp";

export type UseErrorMessage = (error: Error) => void;

export function mkUseErrorMessages(addPopup: AddPopup): UseErrorMessage {
  return useCallback(
    (error: Error) => {
      const message = `${error.message || error.toString()}`;
      const lowerCasedMessage = error.message.toLowerCase();

      if (lowerCasedMessage.includes("magic")) return logger.error(message);

      // typically internet connection related
      // we should handle these kind of errors better
      if (lowerCasedMessage === "undefined") return logger.warn(message);

      logger.error(message);

      addPopup({
        content: {
          summary: error.message || error.toString(),
          title: "Error",
          type: PopupType.error,
        },
      });
    },
    [addPopup]
  );
}
