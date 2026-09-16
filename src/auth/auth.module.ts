import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { UserModule } from '../user/user.module.js';
import { PASSWORD_HASHER } from './password-hash/password-hasher.interface.js';
import { BcryptPasswordHasher } from './password-hash/bcrypt-password-hasher.js';
import { TokenModule } from './token/token.module.js';

@Module({
  imports: [
    UserModule,
    TokenModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {provide: PASSWORD_HASHER, useClass: BcryptPasswordHasher},
  ]
})
export class AuthModule {}
