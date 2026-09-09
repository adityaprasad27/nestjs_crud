import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    registerUser() {
        return {"message":"this is for registering user"}
    }
}
