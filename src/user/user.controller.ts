import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserDto } from './dto/request/user-create-update.dto';
import { UserDtoResponse } from './dto/response/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<UserDtoResponse> {
    return this.userService.getUserById(id);
  }

  @Post()
  async createUser(@Body() userDto: UserDto): Promise<UserDtoResponse> {
    return this.userService.createUser(userDto);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() userDto: UserDto,
  ): Promise<void> {
    return this.userService.updateUser(id, userDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
