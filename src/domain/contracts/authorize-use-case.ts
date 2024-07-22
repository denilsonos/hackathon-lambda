import { AuthorizeRequestDto } from "src/domain/dtos/authorize-request-dto";

export interface AuthorizeUseCase {
  execute(request: AuthorizeRequestDto): Promise<void>;
}