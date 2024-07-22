import { CognitoIdentityProviderClient, GetUserCommand, GetUserCommandOutput } from "@aws-sdk/client-cognito-identity-provider";
import { AuthenticationDetails, CognitoUser, CognitoUserPool, CognitoUserSession } from "amazon-cognito-identity-js";

export class AwsCognitoClientProvider {
  constructor(
    public readonly client: CognitoIdentityProviderClient,
    private readonly userPoolId: string,
    private readonly clientId: string,
  ) { }


  public user(user: string): CognitoUser {
    return new CognitoUser({
      Username: user,
      Pool: new CognitoUserPool({
        UserPoolId: this.userPoolId,
        ClientId: this.clientId,
      })
    })
  }

  public authentication(user: string, password: string): AuthenticationDetails {
    return new AuthenticationDetails({
      Username: user,
      Password: password,
    })
  }

  public async authenticate(user: CognitoUser, authentication: AuthenticationDetails): Promise<string> {
    const session = await this.authenticateCognitoUser(user, authentication);
    return session.getAccessToken().getJwtToken()
  }


  public async authorize(accessToken: string): Promise<GetUserCommandOutput> {
    return await this.client.send(new GetUserCommand({
      AccessToken: accessToken
    }))
  }

  private async authenticateCognitoUser(user: CognitoUser, authentication: AuthenticationDetails): Promise<CognitoUserSession> {
    return new Promise((resolve, reject) => {
      user.authenticateUser(authentication, {
        onSuccess: resolve,
        onFailure: reject,
        newPasswordRequired: resolve,
      });
    });
  }
}