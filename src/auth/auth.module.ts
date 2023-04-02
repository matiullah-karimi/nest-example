import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { BcryptService } from 'src/core/services/bcrytp.service';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expirationTime },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, BcryptService]
})
export class AuthModule { }
