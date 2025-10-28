import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserRepository } from './repository/user.repository';
import { PrismaUserRepository } from './repository/prisma/user.prisma';
import { PrismaService } from 'nestjs-prisma';
import { UserController } from './controllers/user.controller';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserRepository, UserService],
})
export class UserModule {}
