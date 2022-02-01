import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoRepositoryService } from './todo-repository.service';
import { TodoEntity } from './todo.entity';
import { CreateTodoItemUseCase } from './use-cases/create-todo-item.usecase';
import { DeleteTodoItemUseCase } from './use-cases/delete-todo-item.usecase';
import { GetTodoListUseCase } from './use-cases/get-todo-list.usecase';
import { UpdateTodoItemUseCase } from './use-cases/update-todo-item.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  providers: [
    TodoRepositoryService,
    GetTodoListUseCase,
    CreateTodoItemUseCase,
    UpdateTodoItemUseCase,
    DeleteTodoItemUseCase,
  ],
  exports: [TodoRepositoryService],
})
export class TodoRepositoryModule {}
