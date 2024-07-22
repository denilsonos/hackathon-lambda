import { APIGatewayEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Context } from "aws-lambda";
import { AuthorizeUseCaseImpl } from "../../application/use-cases/authorize-use-case";
import { CognitoAuthenticationRepository } from "../../infrastructure/repositories/cognito-authentication-repository";
import { AuthorizeController } from "../../interfaces/controllers/authorize-controller";
import { makeAwsCognitoClientProvider } from "../../infrastructure/clients/aws/factories/aws-cognito-client-provider-factory";

export const handler: APIGatewayProxyHandler = (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResult> => {
  const clientProviderFactory = makeAwsCognitoClientProvider();
  const authenticationRepository = new CognitoAuthenticationRepository(clientProviderFactory);
  const authorizeUseCase = new AuthorizeUseCaseImpl(authenticationRepository);
  const controller = new AuthorizeController(authorizeUseCase);
  return controller.execute(event.body);
}