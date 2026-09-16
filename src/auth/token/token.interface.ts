export interface TokenPayload {
    sub: number;
    username: string;
}

export interface TokenService {
    sign(payload: TokenPayload) : Promise<string>;
    verify(token: string) : Promise<TokenPayload>
}

export const TOKEN_SERVICE = Symbol('TOKEN_SERVICE')