import { Exception } from "../../domain/http/errors";

export type HttpResponseHeader = {
  [header: string]: string | number | boolean;
}

export type HttpResponse = {
  statusCode: number;
  headers: HttpResponseHeader;
  body: string;
}

const makeHttpResponseHeaders = (): HttpResponseHeader => {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  }
}

export class HttpResponseCreator {

  public static success = <T = any>(status: number, data?: T): HttpResponse => ({
    statusCode: status,
    headers: makeHttpResponseHeaders(),
    body: data ? JSON.stringify(data) : undefined
  });

  public static error = (error: Exception): HttpResponse => ({
    statusCode: error.statusCode,
    headers: makeHttpResponseHeaders(),
    body: JSON.stringify({ message: error.message })
  });
}
