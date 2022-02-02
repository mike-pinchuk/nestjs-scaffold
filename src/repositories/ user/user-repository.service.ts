import { Injectable } from '@nestjs/common';
import { UserDto } from '../../user/dto/request/user-create-update.dto';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { DeleteUserUseCase } from './use-cases/delete-user.usecase';
import { GetUserUseCase } from './use-cases/get-user.usecase';
import { UpdateUserUseCase } from './use-cases/update-user.usecase';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepositoryService {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
    private getUserUseCase: GetUserUseCase,
    private updateUserUseCase: UpdateUserUseCase,
  ) {}

  async getUserById(id: number): Promise<UserEntity> {
    return this.getUserUseCase.exec(id);
  }

  async createUser(userDto: UserDto): Promise<UserEntity> {
    return this.createUserUseCase.exec(userDto);
  }

  async updateUser(id: number, userDto: UserDto): Promise<void> {
    await this.updateUserUseCase.exec(id, userDto);
  }

  async deleteUser(id: number): Promise<void> {
    await this.deleteUserUseCase.exec(id);
  }
}
