import { Credential } from "src/domain/entities/credential";
import { Session } from "src/domain/entities/session";

export interface AuthenticationRepository {
  authenticate(credential: Credential): Promise<Session>;
  authorize(session: Session): Promise<void>;
}