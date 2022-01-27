import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodoDto } from './dto/todo-create-update.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findTodoList() {
    return await this.todoService.findTodoList();
  }

  @Post()
  async createItem(@Body() todoDto: TodoDto) {
    await this.todoService.createItem(todoDto);
    return await this.todoService.findTodoList();
  }

  @Patch(':id')
  async updateItem(@Param('id') id: number, @Body() todoUpdatedDto: TodoDto) {
    try {
      await this.todoService.updateItem(id, todoUpdatedDto);
      return await this.todoService.findTodoList();
    } catch (error) {
      throw new NotFoundException('ITEM WITH THIS ID IS NOT EXISTED');
    }
  }

  @Delete(':id')
  async deleteItem(@Param('id') id: number) {
    try {
      await this.todoService.deleteItem(id);
      return await this.todoService.findTodoList();
    } catch (error) {
      throw new NotFoundException('ITEM WITH THIS ID IS NOT EXISTED');
    }
  }
}
