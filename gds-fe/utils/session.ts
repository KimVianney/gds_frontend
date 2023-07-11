import ISession from "../types/ISession";

export const signOut = async (): Promise<void> =>
  fetch("/api/sign-out").then(() => {
    window.location.href = "/";
  });

export const getSession = async (): Promise<ISession> =>
  fetch("/api/session").then((res) => res.json());
