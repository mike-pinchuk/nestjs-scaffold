import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserDtoResponse {
  @Expose()
  id: number;

  @Expose()
  nickname: string;

  @Expose()
  email: string;

  @Expose()
  userPassword: string;

  @Expose()
  role: string;
}
