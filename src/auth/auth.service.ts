import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import { RegisterUserDto } from './dto/registerUser.dto.js';

@Injectable()
export class AuthService {
    constructor (private readonly userService: UserService) {};

    registerUser(registerUserDto: RegisterUserDto) {
        return this.userService.createUser(registerUserDto)
    }
}
