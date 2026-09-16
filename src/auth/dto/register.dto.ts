import {IsString, IsNotEmpty, MinLength, IS_STRING} from 'class-validator'

export class RegisterDto{
    @IsString() @IsNotEmpty() username: string;
    @IsString() @MinLength(1) password: string;
}