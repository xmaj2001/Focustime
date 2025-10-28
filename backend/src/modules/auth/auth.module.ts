import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [AuthController],
  imports: [UserModule],
  providers: [AuthService],
})
export class AuthModule {}
