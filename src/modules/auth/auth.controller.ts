import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { LogInDto } from './dto/logIn.dto';

@Controller('auth')
export class AuthController {

    constructor( private readonly authService: AuthService){ }

    @Post('signup')
    async signUp(@Body() signUpDto:SignUpDto):Promise <{token: string}>{

        return this.authService.signUp(signUpDto);
    }

    @Get('login')
    async logIn(@Body()logInDto: LogInDto): Promise <{token: string}>{
        return this.authService.logIn(logInDto);
    }
}
