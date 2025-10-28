import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from '../dto/auth.dto';
import { AuthEntity } from '../entities/auth.entity';
import { UserRepository } from 'src/modules/user/repository/user.repository';
import { JwtService } from '@nestjs/jwt';
import { UserProfile } from 'src/modules/user/entities/user.entity';
import { GenerateAdapter } from 'src/adapter/generate.adapter';

@Injectable()
export class AuthService {
  constructor(
    private readonly user: UserRepository,
    private readonly jwt: JwtService,
  ) {}

  async login(data: LoginDto): Promise<AuthEntity> {
    const userExist = await this.user.findByEmail(data.email);
    if (!userExist)
      throw new NotFoundException(
        `Usuário com email ${data.email} não encontrado`,
      );
    const isValidePassword = await userExist.verifyPassword(data.password);
    if (!isValidePassword)
      throw new UnauthorizedException('Credenciais inválidas');
    const user = userExist.getPublicProfile();
    const token = this.generateToken(user);
    return new AuthEntity({
      user,
      token,
    });
  }

  async register(data: RegisterDto): Promise<AuthEntity> {
    const userExist = await this.user.findByEmail(data.email);
    if (userExist)
      throw new ConflictException(`Usuário com email ${data.email} já existe`);
    data.password = await GenerateAdapter.hashPassword(data.password);
    const user = await this.user.create(data);
    return new AuthEntity({
      user: user.getPublicProfile(),
      token: this.generateToken(user),
    });
  }

  private generateToken(user: UserProfile): string {
    return this.jwt.sign(
      { sub: user.id, email: user.email },
      { expiresIn: '1m' },
    );
  }
}
