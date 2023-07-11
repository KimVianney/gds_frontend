import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreatePopup } from "../../types/PopUp";
import { addPopup, removePopup } from ".";
import { RootState } from "../index";

export type AddPopup = (props: CreatePopup) => void;

export function UseAddPopup(): (props: CreatePopup) => void {
  const dispatch = useDispatch();

  return useCallback(
    (props) => {
      dispatch(addPopup(props));
    },
    [dispatch]
  );
}

export function UseRemovePopup(): (key: string) => void {
  const dispatch = useDispatch();
  return useCallback(
    (key: string) => {
      dispatch(removePopup(key));
    },
    [dispatch]
  );
}

export function UseActivePopups(): RootState["application"]["popupList"] {
  const list = useSelector((state: RootState) => state.application.popupList);
  return useMemo(() => list.filter((item) => item.show), [list]);
}
