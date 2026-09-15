import { Injectable } from "@nestjs/common";
import { PasswordHasher } from "./password-hasher.interface.js";
import bcrypt from 'bcrypt'
@Injectable()
export class BcryptPasswordHasher implements PasswordHasher {
    hash(plain: string) {
        return bcrypt.hash(plain, 10); 
    }

    compare(plain: string, hashed: string): Promise<boolean> {
        return bcrypt.compare(plain, hashed);
    }
}