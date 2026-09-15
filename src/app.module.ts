import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CatsController } from './cats.controller.js';
import { AuthModule } from './auth/auth.module.js';
import { UserModule } from './user/user.module.js';
import { UserService } from './user/user.service.js';

@Module({
  imports: [
    AuthModule, 
    UserModule],
  controllers: [AppController, CatsController],
  providers: [AppService, UserService],
})
export class AppModule {}
