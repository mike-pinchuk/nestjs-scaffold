import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user.entity';

@Injectable()
export class SetRefreshTokenUserUseCase {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async exec(refreshToken, id: number): Promise<void> {
    await this.userRepository
      .createQueryBuilder()
      .update(UserEntity)
      .set({
        refreshToken: `${refreshToken}`,
      })
      .where('id = :id', { id: id })
      .execute();
  }
}
