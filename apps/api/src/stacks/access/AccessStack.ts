import {Stack, StackProps} from 'aws-cdk-lib';
import {Construct} from "constructs";
import {NodejsFunction} from "aws-cdk-lib/aws-lambda-nodejs";
import {LambdaRestApi} from "aws-cdk-lib/aws-apigateway";
import {Architecture} from "aws-cdk-lib/aws-lambda";
import {RetentionDays} from "aws-cdk-lib/aws-logs";

export default class AccessStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps, isTest: boolean = false) {
    super(scope, id, props);

    // Ajuste técnico para testar cada stack individualmente
    const appDir: string =  isTest ? require.main.path + '/../../' : require.main.path;

    const newHandler = new NodejsFunction(this, 'new', {
      functionName: 'Severino-access-new-token-function',
      entry: appDir + '/app/modules/access/handlers/NewKeyHandler.ts',
      architecture: Architecture.ARM_64,
      logRetention: RetentionDays.ONE_DAY,
      memorySize: 128,
      bundling:
        {
          minify: true,
          tsconfig: appDir + '/../tsconfig.app.json',
        },
      environment: {
        teste: 'wow',
      }
    });

    new LambdaRestApi(this, 'severino', {
      handler: newHandler,
      binaryMediaTypes: ['application/octet-stream']
    });
  }
}
