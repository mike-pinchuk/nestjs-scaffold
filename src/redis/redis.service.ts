import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly redis: Redis) {}
  async setTokenToRedis(key: string, value: string) {
    await this.redis.set(key, value, 'EX', 7200);
  }
  async getTokenFromRedis(key: string) {
    return this.redis.get(key);
  }
}
