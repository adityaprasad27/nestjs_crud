import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import { PASSWORD_HASHER } from './password-hash/password-hasher.interface.js';
import type { PasswordHasher } from './password-hash/password-hasher.interface.js';
import type { TokenPayload, TokenService } from './token/token.interface.js';
import { TOKEN_SERVICE } from './token/token.interface.js';

@Injectable()
export class AuthService {
    constructor (
        private userService: UserService,
        @Inject(TOKEN_SERVICE) private tokenService: TokenService,
        @Inject(PASSWORD_HASHER) private passwordHasher: PasswordHasher,
    ) {};

    async signIn(username: string, pass: string): Promise<{access_token: string}> {
        const user = await this.userService.findUser(username);

        if(!user || !(await this.passwordHasher.compare(pass, user.passwordHash)) ){
            throw new UnauthorizedException();
        }
        const payload: TokenPayload = {sub: user.userId, username: user.username};
        return {
            access_token: await this.tokenService.sign(payload),
        }
    } 
}
