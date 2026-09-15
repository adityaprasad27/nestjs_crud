import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthGuard } from './auth.guard.js';
import { UserService } from '../user/user.service.js';

@Controller('auth')
export class AuthController {
    constructor (
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {};

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.username, signInDto.password)
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getUser(@Request() req: any) {
        return req.user;
    }

    @UseGuards(AuthGuard)
    @Get('getbio')
    getBio(@Request() req: any) {
        return this.userService.getBio(req.user.username);
    }
}
