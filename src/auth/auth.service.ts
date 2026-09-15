import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import { JwtService } from '@nestjs/jwt';
import { PASSWORD_HASHER } from './password-hash/password-hasher.interface.js';
import type { PasswordHasher } from './password-hash/password-hasher.interface.js';

@Injectable()
export class AuthService {
    constructor (
        private userService: UserService,
        private jwtService: JwtService,
        @Inject(PASSWORD_HASHER) private passwordHasher: PasswordHasher,
    ) {};

    async signIn(username: string, pass: string): Promise<{access_token: string}> {
        const user = await this.userService.findUser(username);

        if(!user || !(await this.passwordHasher.compare(pass, user.passwordHash)) ){
            throw new UnauthorizedException();
        }
        const payload = {sub: user.userId, username: user.username};
        return {
            access_token: await this.jwtService.signAsync(payload),
        }
    } 
}
