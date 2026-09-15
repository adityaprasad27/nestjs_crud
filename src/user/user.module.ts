import { Module } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';

@Module({
    providers: [UserService],
    exports: [UserService],
    controllers: [UserController],
})
export class UserModule {}
