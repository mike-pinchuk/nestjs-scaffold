import { Request } from 'express';
import { UserDtoResponse } from '../user/dto/response/user.dto';
import { UserEntity } from '../repositories/user/user.entity';

export interface RequestWithUser extends Request {
  user: UserEntity;
}

export interface AuthResponse {
  user: UserDtoResponse;
  accessToken: string;
  refreshToken: string;
}
