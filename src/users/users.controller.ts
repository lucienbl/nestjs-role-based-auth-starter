import { Controller, UseGuards, Get, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RolesAllowed } from 'src/auth/decorators/roles.decorator';
import { Roles } from 'src/auth/Roles';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Users")
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {

    @Get('profile')
    @RolesAllowed(Roles.USER)
    getProfile(@Request() req) {
        return req.user;
    }
}
