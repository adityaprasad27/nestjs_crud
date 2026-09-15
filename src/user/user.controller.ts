import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard.js';
import { Request } from '@nestjs/common';
import { UserService } from './user.service.js';

@Controller('user')
export class UserController {

    constructor (private readonly userService: UserService) {}


    @UseGuards(AuthGuard)
    @Get('profile')
    getUser(@Request() req: any) {
        return req.user;
    } 

    @UseGuards(AuthGuard)
    @Get('bio')
    getBio(@Request() req: any) {
        return this.userService.getBio(req.user.username);
    }
}
