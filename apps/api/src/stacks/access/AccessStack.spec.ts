import AccessStack from './AccessStack';
import {App} from "aws-cdk-lib";
import {Template} from "aws-cdk-lib/assertions";

describe('AccessStack Tests', () => {
  const app = new App();
  const accessStack = new AccessStack(app, 'AccessStack', {}, true);
  const template = Template.fromStack(accessStack);

  it('Stack test without testing flag', () => {
    const appToThrow = new App();
    expect(() => new AccessStack(appToThrow, 'AccessStack')).toThrow();
  });

  it('Stack should contain lambda for new token endpoint ', () => {
    template.hasResource("AWS::Lambda::Function", {
      Properties: {
        FunctionName: "Severino-access-new-token-function",
        Runtime: "nodejs14.x",
        MemorySize: 128,
        Architectures: [
          "arm64"
        ],
        Environment: {
          Variables: {
            teste: "wow"
          }
        }
      }
    });
  });

  it('Lambda for new token endpoint should have retention of 1 day', () => {
    const lambdaResource = template.findResources("AWS::Lambda::Function", {
      Properties: {
        FunctionName: "Severino-access-new-token-function",
        Runtime: "nodejs14.x",
        MemorySize: 128,
        Architectures: [
          "arm64"
        ],
        Environment: {
          Variables: {
            teste: "wow"
          }
        }
      }
    });
    template.hasResource('Custom::LogRetention', {
      Properties: {
        LogGroupName: {
          'Fn::Join': [
            '',
            [
              "/aws/lambda/",
              {
                Ref: Object.keys(lambdaResource)[0]
              }
            ]
          ]
        },
        RetentionInDays: 1
      }
    });
  });

  it('Stack should severino api gateway ', () => {
    template.hasResource("AWS::ApiGateway::RestApi", {
      Properties: {
        Name: "severino",
        BinaryMediaTypes: [
          "application/octet-stream"
        ],
      }
    });
  });
});
