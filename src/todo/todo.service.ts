import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  async findTodoList(): Promise<TodoEntity[]> {
    return this.todoRepository.find();
  }

  async createItem(todoDto: object): Promise<TodoEntity> {
    return this.todoRepository.save(todoDto);
  }

  async updateItem(
    id: number,
    todoDto: Partial<Omit<TodoEntity, 'id'>>,
  ): Promise<void> {
    await this.todoRepository.update({ id }, todoDto);
  }

  async deleteItem(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
