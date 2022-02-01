import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from '../todo.entity';
import { TodoDto } from '../../../todo/dto/request/todo-create-update.dto';

@Injectable()
export class CreateTodoItemUseCase {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  async exec(todoDto: TodoDto): Promise<TodoEntity> {
    return this.todoRepository.save(todoDto);
  }
}
