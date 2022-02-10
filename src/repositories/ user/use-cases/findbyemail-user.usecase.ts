import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user.entity';

@Injectable()
export class FindUserByEmailUseCase {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async exec(email: string): Promise<UserEntity> {
    const isUserExist = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.userPassword')
      .select()
      .where('user.email = :email', { email })
      .getOne();
    return isUserExist;
  }
}
