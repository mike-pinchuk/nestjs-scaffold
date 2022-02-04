import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';
import { RedisDBModule } from '../redis/redis.module';

@Global()
@Module({
  imports: [
    ConfigModule.load(
      path.resolve(__dirname, '../config', '**', '!(*.d).{ts,js}'),
    ),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    RedisDBModule,
  ],
})
export class CoreModule {}
