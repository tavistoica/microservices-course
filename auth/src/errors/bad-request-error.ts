import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(public reason: string) {
    super("Bad request error");
    //  Only when extending a build class
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors = () => {
    return [
      {
        message: this.reason,
      },
    ];
  };
}
