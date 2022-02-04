import Rollbar from 'rollbar';
import { config } from 'dotenv';

config();

export const rollbarConfig = new Rollbar({
  accessToken: process.env.ACCESS_TOKEN_ROLLBAR,
  captureUncaught: true,
  captureUnhandledRejections: true,
});

rollbarConfig.log('Hello world!');
