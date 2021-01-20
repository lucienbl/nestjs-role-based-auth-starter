/*
 *   Copyright (c) 2020 Lucien Blunk-Lallet

 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.

 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.

 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/auth/guards/firebase-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RolesAllowed } from 'src/auth/decorators/roles.decorator';
import { Roles } from 'src/constants/Roles';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from "./decorators/get-user.decorator";
import { UsersService } from "./users.service";
import { UpdateFcmTokenDto } from "./dto/update-fcm-token.dto";
import { RegisterUserDto } from "./dto/register-user.dto";
import UserDto from "./dto/user.dto";
import { Public } from "../auth/decorators/public.decorator";

@ApiTags("Users")
@Controller('/users')
@UseGuards(FirebaseAuthGuard, RolesGuard)
@RolesAllowed(Roles.ADMIN)
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {}

    @Post("/register")
    @Public()
    registerUser(@Body() registerUserDto: RegisterUserDto) {
        return this.usersService.registerUser(registerUserDto);
    }

    @Get('/me')
    @RolesAllowed(Roles.USER)
    getMe(@GetUser() userDto: UserDto) {
        return userDto;
    }

    @Put('/fcmToken')
    @RolesAllowed(Roles.USER)
    updateFcmToken(@GetUser() userDto: UserDto, @Body() updateFcmTokenDto: UpdateFcmTokenDto) {
        return this.usersService.updateUserFcmToken(userDto, updateFcmTokenDto);
    }
}
