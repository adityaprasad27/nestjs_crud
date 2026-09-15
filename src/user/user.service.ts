import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from './user-repository/user-repository.interface.js';
import type { UserRepository } from './user-repository/user-repository.interface.js';
export type User = any; // this should be real class/interface

@Injectable()
export class UserService {

    constructor(@Inject(USER_REPOSITORY) private userRepository: UserRepository) {}

    async findUser(username: string) {
        return this.userRepository.findByUsername(username);
    }

    async getBio(username: string) {
        const user = await this.userRepository.findByUsername(username);
        return user?.bio;
    }
}
