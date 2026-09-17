import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseFilters, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { SignInDto } from './dto/signin.dto.js';
import { MongoDuplicateUsernameFilter } from '../common/filters/mongo-duplicate-username.filter.js';

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

    @UseFilters(new MongoDuplicateUsernameFilter())
    @Post('register')
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto.username, dto.password);
    }
}
