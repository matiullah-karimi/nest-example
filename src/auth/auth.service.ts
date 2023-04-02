import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from 'src/core/services/bcrytp.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService, 
        private usersService: UsersService,
        private bcryptService: BcryptService
    ) {}

    async signIn(email: string, password: string) {
        const [user] = await this.usersService.find(email);
        
        if(!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const match = await this.bcryptService.compare(password, user.password);

        if (!match) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const payload = { email: user.email, sub: user.id };

        const jwtToken = await this.jwtService.signAsync(payload);

        return {
            accessToken: jwtToken,
            user: user
        }
    }
}
