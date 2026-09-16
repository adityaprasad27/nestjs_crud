import { Injectable } from "@nestjs/common";
import { TokenPayload, TokenService } from "./token.interface.js";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtTokenService implements TokenService {
    constructor(private readonly jwtService: JwtService) {}

    sign(payload: TokenPayload): Promise<string> {
        return this.jwtService.signAsync(payload);
    }

    verify(token: string): Promise<TokenPayload> {
        return this.jwtService.verifyAsync(token);
    }
}