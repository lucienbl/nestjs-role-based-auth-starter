import { Controller, Request, UseGuards, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';

@ApiTags("Auth")
@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}
    
    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('register')
    async register(@Request() req) {
        return this.authService.register(req.body);
    }
}
