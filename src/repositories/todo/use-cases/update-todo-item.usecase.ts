import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoDto } from '../../../todo/dto/request/todo-create-update.dto';
import { Repository } from 'typeorm';
import { TodoEntity } from '../todo.entity';

@Injectable()
export class UpdateTodoItemUseCase {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  async exec(id: number, todoDto: TodoDto): Promise<void> {
    await this.todoRepository.update({ id }, todoDto);
  }
}
