import { Credential } from "../../domain/entities/credential";
import { LoginUseCase } from "../../domain/contracts/login-use-case";
import { AuthenticationRepository } from "../../domain/contracts/authentication-repository";
import { LoginRequestDto } from "../../domain/dtos/login-request-dto";
import { SessionResponseDto } from "../../domain/dtos/session-response-dto";

export class LoginUseCaseImpl implements LoginUseCase {
  constructor(
    private readonly authenticationRepository: AuthenticationRepository
  ) { }

  public async execute(request: LoginRequestDto): Promise<SessionResponseDto> {
    const credential = new Credential(request.email, request.password)
    const session = await this.authenticationRepository.authenticate(credential)
    return session.toResponse();
  }
}