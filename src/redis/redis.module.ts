import { config } from 'dotenv';
import { Module } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { RedisService } from './redis.service';

config();

@Module({
  imports: [
    RedisModule.forRoot({
      readyLog: true,
      config: {
        namespace: process.env.REDIS_NAMESPACE,
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
      },
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisDBModule {}
