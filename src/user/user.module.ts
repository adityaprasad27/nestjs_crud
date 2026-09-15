import { Module } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';
import { USER_REPOSITORY } from './user-repository/user-repository.interface.js';
import { InMemoryUserRepository } from './user-repository/in-memory-user-repository.js';

@Module({
    providers: [
        UserService,
        {provide: USER_REPOSITORY, useClass: InMemoryUserRepository}
    ],
    exports: [UserService],
    controllers: [UserController],
})
export class UserModule {}
