import { HttpResponse } from "src/domain/http/http-response";

export interface IController {
  execute: (body: string) => Promise<HttpResponse>;
}