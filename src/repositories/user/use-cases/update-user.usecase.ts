import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from '../../../user/dto/request/user-create-update.dto';
import { Repository } from 'typeorm';
import { UserEntity } from '../user.entity';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async exec(id: number, todoDto: UserDto): Promise<void> {
    await this.userRepository.update({ id }, todoDto);
  }
}
