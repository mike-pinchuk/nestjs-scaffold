import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { TodoModule } from './todo/todo.module';
import { TodoRepositoryModule } from './repositories/todo/todo-repository.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [CoreModule, TodoModule, TodoRepositoryModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
