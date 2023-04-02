import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthUser } from './auth-user.decorator';
import { AuthGuard } from './auth.gaurd';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    signIn(@Body() body: any) {
        return this.authService.signIn(body.email, body.password);
    }

    @UseGuards(AuthGuard)
    @Get('/me')
    me(@AuthUser() authUser) {
        return authUser;
    }
}
