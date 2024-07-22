import { HttpResponse, HttpResponseCreator } from "../../domain/http/http-response";
import { IController } from "../../domain/contracts/controller";
import { LoginRequestDto } from "../../domain/dtos/login-request-dto";
import { LoginUseCase } from "../../domain/contracts/login-use-case";
import { StatusCodes } from "http-status-codes";

export class LoginController implements IController {
  constructor(
    private loginUseCase: LoginUseCase
  ) { }

  async execute(body: string): Promise<HttpResponse> {
    try {
      const request: LoginRequestDto = JSON.parse(body);
      const response = await this.loginUseCase.execute(request);
      return HttpResponseCreator.success(StatusCodes.OK, response);
    } catch (error) {
      return HttpResponseCreator.error(error);
    }
  }
}