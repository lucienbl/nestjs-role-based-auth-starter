import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule, 
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || "debug",
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService, 
    LocalStrategy, 
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
