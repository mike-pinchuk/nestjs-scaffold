import { Injectable } from '@nestjs/common';
import { TodoEntity } from '../repositories/todo/todo.entity';
import { TodoRepositoryService } from '../repositories/todo/todo-repository.service';
import { TodoDto } from './dto/request/todo-create-update.dto';
import { plainToClass } from 'class-transformer';
import { TodoItemResponse } from './dto/response/todo-item.response';

@Injectable()
export class TodoService {
  constructor(private todoRepositoryService: TodoRepositoryService) {}

  async findTodoList(): Promise<TodoItemResponse[]> {
    const todoList = await this.todoRepositoryService.getTodoList();
    return plainToClass(TodoItemResponse, todoList);
  }

  async createItem(todoDto: TodoDto): Promise<TodoEntity> {
    return this.todoRepositoryService.createTodoItem(todoDto);
  }

  async updateItem(id: number, todoDto: TodoDto): Promise<void> {
    await this.todoRepositoryService.updateTodoItem(id, todoDto);
  }

  async deleteItem(id: number): Promise<void> {
    await this.todoRepositoryService.deleteTodoItem(id);
  }
}
