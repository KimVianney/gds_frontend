import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import User from "../../types/User";
import { AppDispatch, RootState } from "../index";
import { removeProfile, setProfile, updateProfile } from "./index";

export type UserMutation = (user: User) => void;
export type RemoveUser = () => void;

export function UseAddUser(): UserMutation {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    (user: User) => {
      dispatch(setProfile(user));
    },
    [dispatch]
  );
}

export function UseUpdateUser(): UserMutation {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    (user: User) => {
      dispatch(updateProfile(user));
    },
    [dispatch]
  );
}

export function UseRemoveUser(): RemoveUser {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(() => {
    dispatch(removeProfile());
  }, [dispatch]);
}

export function UseGetUser(): User {
  return useSelector<RootState, RootState["user"]["profile"]>(
    ({ user: { profile } }) => profile
  );
}
