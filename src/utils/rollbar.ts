import Rollbar from 'rollbar';
import { typedEnv } from './typed-env';

export const rollbarConfig = new Rollbar({
  accessToken: typedEnv.ACCESS_TOKEN_ROLLBAR,
  captureUncaught: true,
  captureUnhandledRejections: true,
});

rollbarConfig.log('Hello world!');
