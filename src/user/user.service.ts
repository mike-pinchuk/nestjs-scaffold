import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UserRepositoryService } from '../repositories/ user/user-repository.service';
import { UserDto } from './dto/request/user-create-update.dto';
import { UserDtoResponse } from './dto/response/user.dto';

@Injectable()
export class UserService {
  constructor(private userRepositoryService: UserRepositoryService) {}

  async getUserById(id: number): Promise<UserDtoResponse> {
    const user = await this.userRepositoryService.getUserById(id);
    return plainToClass(UserDtoResponse, user);
  }

  async createUser(userDto: UserDto): Promise<UserDtoResponse> {
    const user = await this.userRepositoryService.createUser(userDto);
    return plainToClass(UserDtoResponse, user);
  }

  async updateUser(id: number, userDto: UserDto): Promise<void> {
    await this.userRepositoryService.updateUser(id, userDto);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepositoryService.deleteUser(id);
  }

  async findUserByEmail(email: string): Promise<UserDtoResponse | undefined> {
    const result = await this.userRepositoryService.findUserByEmail(email);
    return plainToClass(UserDtoResponse, result);
  }

  async setCurrentRefreshToken(refreshToken, userId): Promise<void> {
    await this.userRepositoryService.setCurrentRefreshToken(
      refreshToken,
      userId,
    );
  }
}
