import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from '../../../user/dto/request/user-create-update.dto';
import { Repository } from 'typeorm';
import { UserEntity } from '../user.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async exec(todoDto: UserDto): Promise<UserEntity> {
    return this.userRepository.save(todoDto);
  }
}
