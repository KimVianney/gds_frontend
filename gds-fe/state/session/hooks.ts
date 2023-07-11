import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "..";
import ISession from "../../types/ISession";
import { setSession, updateSession } from "./index";

export type SessionMutation = (session: ISession) => void;
export type RemoveSession = () => void;

export function UseAddSession(): SessionMutation {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    (session: ISession) => {
      dispatch(setSession(session));
    },
    [dispatch]
  );
}

export function UseUpdateSession(): SessionMutation {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    (session: Partial<ISession>) => {
      dispatch(updateSession(session));
    },
    [dispatch]
  );
}

export function UseRemoveSession(): RemoveSession {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(() => {
    dispatch(setSession({ status: "unauthenticated" }));
  }, [dispatch]);
}

export function UseGetSession(): ISession {
  return useSelector<RootState, RootState["session"]>(({ session }) => session);
}
