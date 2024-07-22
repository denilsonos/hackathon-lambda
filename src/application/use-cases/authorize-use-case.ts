import { AuthenticationRepository } from "../../domain/contracts/authentication-repository";
import { AuthorizeUseCase } from "../../domain/contracts/authorize-use-case";
import { AuthorizeRequestDto } from "../../domain/dtos/authorize-request-dto";
import { Session } from "../../domain/entities/session";

export class AuthorizeUseCaseImpl implements AuthorizeUseCase {
  constructor(
    private readonly authenticationRepository: AuthenticationRepository
  ) { }

  public async execute(request: AuthorizeRequestDto): Promise<void> {
    const session = new Session(request.accessToken)
    await this.authenticationRepository.authorize(session)
  }
}