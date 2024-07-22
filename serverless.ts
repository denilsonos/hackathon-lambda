import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'fiap-lambda-authentication-api',
  frameworkVersion: '3',
  useDotenv: true,
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    stage: process.env.NODE_ENV || 'dev',
    region: 'us-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      REGION: '${self:provider.region}',
      STAGE: '${self:provider.stage}',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  plugins: [
    'serverless-offline',
    'serverless-dotenv-plugin'
  ],
  package: {
    individually: true,
    excludeDevDependencies: true,
    exclude: ['./**', '!node_modules/**'],
    include: ['dist/**']
  },
  custom: {
    ['serverless-offline']: {
      httpPort: 3000,
      websocketPort: 3001,
      lambdaPort: 3002
    }
  },
  functions: {
    login: {
      handler: 'dist/interfaces/handlers/login.handler',
      events: [
        {
          http: {
            method: 'POST',
            path: 'v1/login',
            cors: true
          }
        }
      ]
    },
    authorize: {
      handler: 'dist/interfaces/handlers/authorize.handler',
      events: [
        {
          http: {
            method: 'POST',
            path: 'v1/authorize',
            cors: true
          }
        }
      ]
    }
  },
};

module.exports = serverlessConfiguration;
