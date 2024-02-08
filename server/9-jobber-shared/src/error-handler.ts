import { StatusCodes } from 'http-status-codes';

export interface IErrorResponse {
  message: string;
  statusCode: number;
  status: string;
  comingFrom: string;
  serialzeErrors(): IError;
}

export interface IError {
  message: string;
  statusCode: number;
  status: string;
  comingFrom: string;
}

/**
 * Abstract class representing a custom error.
 */
export abstract class CustomError extends Error {
  /**
   * The HTTP status code associated with the error.
   */
  abstract statusCode: number;
  /**
   * The status message associated with the error.
   */
  abstract status: string;
  /**
   * The source of the error.
   */
  comingFrom: string;

  /**
   * Creates a new instance of the CustomError class.
   * @param message The error message.
   * @param comingFrom The source of the error.
   */
  constructor(message: string, comingFrom: string) {
    super(message);
    this.comingFrom = comingFrom;
  }

  /**
   * Serializes the error into a standard format.
   * @returns An object representing the serialized error.
   */
  serialzeErrors(): IError {
    return {
      message: this.message,
      statusCode: this.statusCode,
      status: this.status,
      comingFrom: this.comingFrom,
    };
  }
}

export class BadRequest extends CustomError {
  statusCode = StatusCodes.BAD_REQUEST;
  status = 'error';

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}

export class NotFound extends CustomError {
  statusCode = StatusCodes.NOT_FOUND;
  status = 'error';

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}

export class Unauthorized extends CustomError {
  statusCode = StatusCodes.UNAUTHORIZED;
  status = 'error';

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}

export class FileTooLarge extends CustomError {
  statusCode = StatusCodes.REQUEST_TOO_LONG;
  status = 'error';

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}

export class ServerError extends CustomError {
  statusCode = StatusCodes.SERVICE_UNAVAILABLE;
  status = 'error';

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}

export interface ErrorNumException extends Error {
  errnum?: number;
  code?: string;
  path?: string;
  syscall?: string;
  stack?: string;
}
