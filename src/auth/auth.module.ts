import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { UserModule } from '../user/user.module.js';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PASSWORD_HASHER } from './password-hash/password-hasher.interface.js';
import { BcryptPasswordHasher } from './password-hash/bcrypt-password-hasher.js';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      global:true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {expiresIn: '600s'},
      })
    }) 
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {provide: PASSWORD_HASHER, useClass: BcryptPasswordHasher}
  ]
})
export class AuthModule {}
