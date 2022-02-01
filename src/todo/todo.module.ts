import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoRepositoryModule } from '../repositories/todo/todo-repository.module';

@Module({
  imports: [TodoRepositoryModule],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
