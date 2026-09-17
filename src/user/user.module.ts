import { Module } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';
import { USER_REPOSITORY } from './user-repository/user-repository.interface.js';
import { InMemoryUserRepository } from './user-repository/in-memory-user-repository.js';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDocument, UserSchema } from './user-repository/user.schema.js';
import { MongooseUserRepository } from './user-repository/mongoose-user-repository.js';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: UserDocument.name, schema: UserSchema}]),
    ],
    providers: [
        UserService,
        {provide: USER_REPOSITORY, useClass: MongooseUserRepository}
    ],
    exports: [UserService],
    controllers: [UserController],
})
export class UserModule {}
