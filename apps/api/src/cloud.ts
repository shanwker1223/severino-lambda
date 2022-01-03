import { App } from 'aws-cdk-lib';
import AccessStack from './stacks/access/AccessStack';

const app = new App();
new AccessStack(app, 'AccessStack', {
  env: {
    region: 'us-west-2'
  }
});
