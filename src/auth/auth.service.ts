import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDtoResponse } from '../user/dto/response/user.dto';
import { UserDto } from '../user/dto/request/user-create-update.dto';
import { UserService } from '../user/user.service';
import { hashGenerator } from '../utils/hashGenerator';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private redisService: RedisService,
  ) {}

  async registration(userDto: UserDto) {
    const isUserExist = await this.userService.findUserByEmail(userDto.email);
    if (isUserExist) {
      throw new BadRequestException('ERROR: USER WITH THIS EMAIL EXIST');
    }
    const user = await this.userService.createUser(userDto);
    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);
    await this.userService.setCurrentRefreshToken(refreshToken, user.id);
    await this.redisService.setTokenToRedis(String(user.id), accessToken);
    return {
      user,
      accessToken,
    };
  }

  async login(userDto: UserDto) {
    const user = await this.validateUser(userDto);
    return this.generateAccessToken(user);
  }

  private async generateAccessToken(user: UserDtoResponse): Promise<string> {
    const payload = { id: user.id, nickname: user.nickname, email: user.email };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN,
      expiresIn: process.env.JWT_ACCESS_EXPIRATION_TIME,
    });
  }

  private async generateRefreshToken(user: UserDtoResponse): Promise<string> {
    const payload = { id: user.id, nickname: user.nickname, email: user.email };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN,
      expiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME,
    });
  }

  private async validateUser(userDto: UserDto) {
    const user = await this.userService.findUserByEmail(userDto.email);
    if (!user || user.userPassword !== hashGenerator(userDto.userPassword)) {
      throw new NotFoundException('ERROR: CREDANTIAL IS NOT VALID');
    }
    return user;
  }
}
