import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { DeleteUserUseCase } from './use-cases/delete-user.usecase';
import { GetUserUseCase } from './use-cases/get-user.usecase';
import { UpdateUserUseCase } from './use-cases/update-user.usecase';
import { UserRepositoryService } from './user-repository.service';
import { UserEntity } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    UserRepositoryService,
    CreateUserUseCase,
    UpdateUserUseCase,
    GetUserUseCase,
    DeleteUserUseCase,
  ],
  exports: [UserRepositoryService],
})
export class UserRepositoryModule {}
