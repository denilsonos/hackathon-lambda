import { AuthenticationRepository } from "../../domain/contracts/authentication-repository";
import { Credential } from "../../domain/entities/credential";
import { Session } from "../../domain/entities/session";
import { UnauthorizedException } from "../../domain/http/errors";
import { AwsCognitoClientProvider } from "../../infrastructure/clients/aws/aws-cognito-client-provider";

export class CognitoAuthenticationRepository implements AuthenticationRepository {
  constructor(private readonly client: AwsCognitoClientProvider) { }

  public async authenticate(credential: Credential): Promise<Session> {
    return await this.client.authenticate(
      this.client.user(credential.username),
      this.client.authentication(credential.username, credential.password)
    )
      .then((accessToken) => {
        console.log(`User successfully signed in to Amazon Cognito`)
        return new Session(accessToken)
      })
      .catch((error) => {
        console.log(`User is not signed in to Amazon Cognito`)
        console.error(error)
        throw new UnauthorizedException(error.message)
      })
  }

  public async authorize(session: Session): Promise<void> {
    await this.client.authorize(session.accessToken)
      .then(() => {
        console.log(`User successfully authorized in Amazon Cognito`)
      })
      .catch((error) => {
        console.log(`Unauthorized user in Amazon Cognito`)
        console.error(error)
        throw new UnauthorizedException(error.message)
      })
  }
}