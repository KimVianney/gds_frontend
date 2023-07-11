export class HttpError extends Error {
  public status: number;

  constructor(message: string, status = 400) {
    super();
    this.name = "HTTP Error";
    this.status = status;
    this.message = message;
    // see https://www.dannyguo.com/blog/how-to-fix-instanceof-not-working-for-custom-errors-in-typescript/
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
