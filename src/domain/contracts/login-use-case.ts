import { LoginRequestDto } from "src/domain/dtos/login-request-dto";
import { SessionResponseDto } from "src/domain/dtos/session-response-dto";

export interface LoginUseCase {
  execute(request: LoginRequestDto): Promise<SessionResponseDto>;
}