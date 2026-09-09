import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CatsController } from './cats.controller.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [AuthModule],
  controllers: [AppController, CatsController],
  providers: [AppService],
})
export class AppModule {}
