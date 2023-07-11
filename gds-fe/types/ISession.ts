interface Data {
  token: string;
}

export type Status = "loading" | "authenticated" | "unauthenticated";

export default interface ISession {
  data?: Data;
  status: Status;
}
