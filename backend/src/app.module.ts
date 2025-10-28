import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { CacheModule } from '@nestjs/cache-manager';
import { getCacheTTL } from './utils/tll';
import { UserModule } from './modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: getCacheTTL('1h'), // seconds
      max: getCacheTTL('12h'), // maximum number of items in cache
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'defaultSecret',
      signOptions: {
        expiresIn: '1h',
      },
    }),
    PrismaModule.forRoot(),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
