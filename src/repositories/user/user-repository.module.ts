import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { DeleteUserUseCase } from './use-cases/delete-user.usecase';
import { FindUserByEmailUseCase } from './use-cases/findbyemail-user.usecase';
import { GetUserUseCase } from './use-cases/get-user.usecase';
import { SetRefreshTokenUserUseCase } from './use-cases/set-refresh-token-user.usecase';
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
    FindUserByEmailUseCase,
    SetRefreshTokenUserUseCase,
  ],
  exports: [UserRepositoryService],
})
export class UserRepositoryModule {}
