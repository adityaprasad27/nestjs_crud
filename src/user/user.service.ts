import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    createUser() {
        return {"message": "created a new user"}
    }
}
