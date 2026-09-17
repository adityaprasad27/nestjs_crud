import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { SignInDto } from './dto/signin.dto.js';

@Controller('auth')
export class AuthController {
    constructor (
        private readonly authService: AuthService,
    ) {};

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() dto: SignInDto) {
        return this.authService.signIn(dto.username, dto.password)
    }

    // TODO: add mongo spciefic exception filter here which takes precendence over global excpetion filter 
    @HttpCode(HttpStatus.OK)
    @Post('register')
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto.username, dto.password);
    }
}
