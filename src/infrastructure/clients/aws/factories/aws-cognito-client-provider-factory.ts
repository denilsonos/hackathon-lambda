import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider"
import { AwsCognitoClientProvider } from "../aws-cognito-client-provider"

const {
  COGNITO_REGION,
  COGNITO_USER_POOL_ID,
  COGNITO_APP_CLIENT_ID,
  // ACCESS_KEY_ID,
  // SECRET_ACCESS_KEY
} = process.env;

export const makeAwsCognitoClientProvider = (): AwsCognitoClientProvider => {
  return new AwsCognitoClientProvider(
    new CognitoIdentityProviderClient({ region: COGNITO_REGION }),
    COGNITO_USER_POOL_ID,
    COGNITO_APP_CLIENT_ID
  )
}
