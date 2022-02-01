import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodoDto } from './dto/request/todo-create-update.dto';
import { TodoService } from './todo.service';
import { TodoItemResponse } from './dto/response/todo-item.response';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findTodoList(): Promise<TodoItemResponse[]> {
    return this.todoService.findTodoList();
  }

  @Post()
  async createItem(@Body() todoDto: TodoDto): Promise<TodoItemResponse> {
    return this.todoService.createItem(todoDto);
  }

  @Patch(':id')
  async updateItem(
    @Param('id') id: number,
    @Body() todoUpdatedDto: TodoDto,
  ): Promise<void> {
    return this.todoService.updateItem(id, todoUpdatedDto);
  }

  @Delete(':id')
  async deleteItem(@Param('id') id: number): Promise<void> {
    return this.todoService.deleteItem(id);
  }
}
