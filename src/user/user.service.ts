import { Injectable } from '@nestjs/common';

export type User = any; // this should be real class/interface

@Injectable()
export class UserService {
    private readonly users = [
        {
            userId: 1,
            username: 'john',
            password: 'changeme',
            bio: 'kys'
        },
        {
            userId: 2,
            username: 'maria',
            password: 'guess',
            bio: 'mkc'
        },
        {
            userId: 3,
            username: 'ap',
            password: 'ap',
            bio: 'to mai kya karu'
        }
    ];

    async findUser(username: string): Promise<User| undefined> {
        return this.users.find(user => user.username === username);
    }

    async getBio(username: string): Promise<string>{
        const user = await this.findUser(username);
        return user.bio;
    }
}
