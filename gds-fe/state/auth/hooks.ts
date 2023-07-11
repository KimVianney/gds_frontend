import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthState, logIn, logOut } from ".";
import { AppDispatch, RootState } from "..";

export function UseGetAuth(): AuthState {
  return useSelector<RootState, RootState["auth"]>(({ auth }) => auth);
}

export function UseLogin() {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(() => {
    dispatch(logIn());
  }, [dispatch]);
}

export function UseLogout() {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(() => {
    dispatch(logOut());
  }, [dispatch]);
}
