import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserProfile } from 'src/modules/user/entities/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException('Invalid or missing token');
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const payload = await this.jwt.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      request.user = payload as UserProfile;
      return true;
    } catch (error) {
      throw new UnauthorizedException(`Token verification failed: ${error.message}`);
    }
  }

  private extractToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') || [];
    if (type === 'Bearer' && token) {
      return token;
    }
    return undefined;
  }
}
