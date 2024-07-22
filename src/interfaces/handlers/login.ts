import { APIGatewayEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Context } from "aws-lambda";
import { LoginUseCaseImpl } from "../../application/use-cases/login-use-case";
import { makeAwsCognitoClientProvider } from "../../infrastructure/clients/aws/factories/aws-cognito-client-provider-factory";
import { CognitoAuthenticationRepository } from "../../infrastructure/repositories/cognito-authentication-repository";
import { LoginController } from "../controllers/login-controller";

export const handler: APIGatewayProxyHandler = (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResult> => {
  const clientProviderFactory = makeAwsCognitoClientProvider();
  const authenticationRepository = new CognitoAuthenticationRepository(clientProviderFactory);
  const loginUseCase = new LoginUseCaseImpl(authenticationRepository);
  const controller = new LoginController(loginUseCase);
  return controller.execute(event.body);
}