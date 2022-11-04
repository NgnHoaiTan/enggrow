import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { config } from 'dotenv';
import { JwtStrategy } from './jwt.strategy';
import { GoogleStrategy } from './google.strategy';
import { SessionSerializer } from './session.serializer';

config();

@Module({
  imports: [
    UserModule, 
    PassportModule,
    JwtModule.register({
      secret:process.env.SECRET_KEY,
      signOptions:{expiresIn:'200000s'},
    })

  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, GoogleStrategy, SessionSerializer],
  controllers: [AuthController]
})
export class AuthModule { }
