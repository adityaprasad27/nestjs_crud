import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from './user-repository/user-repository.interface.js';
import type { User, UserRepository } from './user-repository/user-repository.interface.js';

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

    async createUser(user: Omit<User, 'userId'>): Promise<User> {
        return this.userRepository.create(user);
    }
}
