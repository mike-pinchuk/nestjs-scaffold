import { Body, Controller, Post } from '@nestjs/common';
import { AuthResponse } from '../utils/types';
import { UserDto } from '../user/dto/request/user-create-update.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('registration')
  async registration(@Body() userDto: UserDto): Promise<AuthResponse> {
    return this.authService.registration(userDto);
  }

  @Post('login')
  async login(@Body() userDto: UserDto): Promise<AuthResponse> {
    return this.authService.login(userDto);
  }
}
