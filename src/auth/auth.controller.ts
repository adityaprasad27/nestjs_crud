import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterUserDto } from './dto/registerUser.dto.js';
// import { UserService } from '../user/user.service.js';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) {};

    @Post('register')
    register(@Body() registerUserDto : RegisterUserDto) {
        return this.authService.registerUser(registerUserDto);
    }
}
