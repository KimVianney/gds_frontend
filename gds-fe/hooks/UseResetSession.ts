import { useCallback } from "react";
import { UseAddPopup } from "../state/application/hooks";
import { PopupType } from "../types/PopUp";
import { UseRouteToPage } from "./useRouteToPage";

export function UseResetSession(message?: string) {
  const addPopup = UseAddPopup();
  const routeToLoginPage = UseRouteToPage("/");

  return useCallback(() => {
    // localStorage.removeItem(authTokenKey);
    addPopup({
      content: {
        summary: message || "Something unexpected happened, Please Login again",
        title: "Error",
        type: PopupType.error,
      },
    });
    routeToLoginPage();
  }, [addPopup, message, routeToLoginPage]);
}
