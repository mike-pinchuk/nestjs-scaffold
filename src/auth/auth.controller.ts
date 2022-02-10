import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from '../user/dto/request/user-create-update.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('registration')
  async registration(@Body() userDto: UserDto) {
    return this.authService.registration(userDto);
  }

  @Post('login')
  async login(@Body() userDto: UserDto) {
    return this.authService.login(userDto);
  }
}
