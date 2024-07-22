import { HttpResponse, HttpResponseCreator } from "../../domain/http/http-response";
import { IController } from "../../domain/contracts/controller";
import { StatusCodes } from "http-status-codes";
import { AuthorizeRequestDto } from "../../domain/dtos/authorize-request-dto";
import { AuthorizeUseCase } from "../../domain/contracts/authorize-use-case";

export class AuthorizeController implements IController {
  constructor(
    private authorizeUseCase: AuthorizeUseCase
  ) { }

  async execute(body: string): Promise<HttpResponse> {
    try {
      const request: AuthorizeRequestDto = JSON.parse(body);
      await this.authorizeUseCase.execute(request);
      return HttpResponseCreator.success(StatusCodes.NO_CONTENT);
    } catch (error) {
      return HttpResponseCreator.error(error);
    }
  }
}