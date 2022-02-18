import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from '../../../user/dto/request/user-create-update.dto';
import { Repository } from 'typeorm';
import { UserEntity } from '../user.entity';
import { hashGenerator } from '../../../utils/hashGenerator';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async exec(userDto: UserDto): Promise<UserEntity> {
    return this.userRepository.save({
      ...userDto,
      userPassword: hashGenerator(userDto.userPassword),
    });
  }
}
