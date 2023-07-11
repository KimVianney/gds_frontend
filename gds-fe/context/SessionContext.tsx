import React, { useContext } from "react";
import ISession from "../types/ISession";

export const SessionContext = React.createContext<ISession>({
  data: undefined,
  status: "loading",
});

interface SessionContextProviderProps {
  children: React.ReactNode;
  session: ISession;
}

const SessionContextProvider = ({
  children,
  session,
}: SessionContextProviderProps): JSX.Element => (
  <SessionContext.Provider value={session}>{children}</SessionContext.Provider>
);

export const useSession = (): ISession => useContext(SessionContext);

export default SessionContextProvider;
