export class HttpError extends Error {
  public status: number;
  public statusText = "";
  public message: string;

  constructor(message: string, status = 400, statusText = "") {
    super();
    this.name = "HTTP Error";
    this.status = status;
    this.statusText = statusText;
    this.message = message;
    // see https://www.dannyguo.com/blog/how-to-fix-instanceof-not-working-for-custom-errors-in-typescript/
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
