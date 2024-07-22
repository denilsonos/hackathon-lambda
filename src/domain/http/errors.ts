import { StatusCodes } from "http-status-codes";

export class Exception extends Error {
  constructor(
    public statusCode: number,
    public message: string,
  ) {
    super(message)
  }
}

export class UnauthorizedException extends Exception {
  private static code = StatusCodes.UNAUTHORIZED;
  constructor(message: string) {
    super(UnauthorizedException.code, message);
  }
}

export class BadRequestException extends Exception {
  private static code = StatusCodes.BAD_REQUEST;
  constructor(message: string) {
    super(BadRequestException.code, message);
  }
}