import { Injectable } from '@nestjs/common';
import { CreateTodoItemUseCase } from './use-cases/create-todo-item.usecase';
import { GetTodoListUseCase } from './use-cases/get-todo-list.usecase';
import { TodoEntity } from './todo.entity';
import { TodoDto } from '../../todo/dto/request/todo-create-update.dto';
import { UpdateTodoItemUseCase } from './use-cases/update-todo-item.usecase';
import { DeleteTodoItemUseCase } from './use-cases/delete-todo-item.usecase';

@Injectable()
export class TodoRepositoryService {
  constructor(
    private createTodoItemUseCase: CreateTodoItemUseCase,
    private getTodoListUseCase: GetTodoListUseCase,
    private updateTodoItemUseCase: UpdateTodoItemUseCase,
    private deleteTodoItemUseCase: DeleteTodoItemUseCase,
  ) {}

  async getTodoList(): Promise<TodoEntity[]> {
    return this.getTodoListUseCase.exec();
  }

  async createTodoItem(todoDto: TodoDto): Promise<TodoEntity> {
    return this.createTodoItemUseCase.exec(todoDto);
  }

  async updateTodoItem(id: number, todoDto: TodoDto): Promise<void> {
    await this.updateTodoItemUseCase.exec(id, todoDto);
  }

  async deleteTodoItem(id: number): Promise<void> {
    await this.deleteTodoItemUseCase.exec(id);
  }
}
