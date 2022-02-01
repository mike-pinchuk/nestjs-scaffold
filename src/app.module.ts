import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { TodoModule } from './todo/todo.module';
import * as path from 'path';
import { TodoRepositoryModule } from './repositories/todo/todo-repository.module';

@Module({
  imports: [
    ConfigModule.load(
      path.resolve(__dirname, 'config', '**', '!(*.d).{ts,js}'),
    ),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    TodoModule,
    TodoRepositoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
