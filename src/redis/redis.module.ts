import { config } from 'dotenv';
import { Global, Module, ValueProvider } from '@nestjs/common';
import { RedisModule, RedisModuleOptions } from '@liaoliaots/nestjs-redis';
import { RedisService } from './redis.service';

config();

const MyOptionsSymbol = Symbol('options');
const MyOptionsProvider: ValueProvider<RedisModuleOptions> = {
  provide: MyOptionsSymbol,
  useValue: {
    closeClient: true,
    readyLog: true,
    config: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
    },
  },
};
@Global()
@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory(options: RedisModuleOptions) {
        return options;
      },
      inject: [MyOptionsSymbol],
      extraProviders: [MyOptionsProvider],
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisDBModule {}
