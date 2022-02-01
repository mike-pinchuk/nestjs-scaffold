import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from '../todo.entity';

@Injectable()
export class DeleteTodoItemUseCase {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  async exec(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
