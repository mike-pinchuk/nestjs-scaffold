import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from '../todo.entity';

@Injectable()
export class GetTodoListUseCase {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  async exec(): Promise<TodoEntity[]> {
    return this.todoRepository.find();
  }
}
