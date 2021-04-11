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

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from "./user.repository";
import { RegisterUserDto } from "./dto/register-user.dto";
import IUser from "./interfaces/user.interface";
import { UpdateFcmTokenDto } from "./dto/update-fcm-token.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly usersRepository: UserRepository,
  ) {}

  async getUserById(id: string): Promise<IUser> {
    return this.usersRepository.findUserById(id);
  }

  async registerUser(registerUserDto: RegisterUserDto): Promise<IUser> {
    return this.usersRepository.registerUser(registerUserDto);
  }

  async updateUserFcmToken(userDto: IUser, updateFcmTokenDto: UpdateFcmTokenDto): Promise<IUser> {
    return this.usersRepository.updateUserFcmToken(userDto, updateFcmTokenDto);
  }
}
