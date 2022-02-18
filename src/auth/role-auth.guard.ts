import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLES_KEYS } from './role-auth.decorator';

@Injectable()
export class RoleAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEYS,
      [context.getHandler(), context.getClass()],
    );
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request, requiredRoles);
  }

  validateRequest(request, requiredRoles) {
    try {
      if (!requiredRoles) {
        return true;
      }
      const authHeader = request.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException();
      }

      const user = this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_TOKEN,
      });
      request.user = user;
      return user.role.some((role) => requiredRoles.includes(role));
    } catch (error) {
      throw new HttpException(
        'User do not have permission',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
