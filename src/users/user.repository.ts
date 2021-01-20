/*
 * Copyright (c) 2021 Lucien Blunk-Lallet
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { ConflictException, InternalServerErrorException, Logger } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import { RegisterUserDto } from "./dto/register-user.dto";
import UserDto from "./dto/user.dto";
import { UpdateFcmTokenDto } from "./dto/update-fcm-token.dto";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {

  private logger = new Logger(UserRepository.name);

  async registerUser(registerUserDto: RegisterUserDto): Promise<UserDto> {
    try {
      const userEntity = new UserEntity();
      userEntity.username = registerUserDto.username;
      userEntity.email = registerUserDto.email;
      userEntity.firebaseUid = registerUserDto.firebaseUid;
      userEntity.firstName = registerUserDto.firstName;
      userEntity.lastName = registerUserDto.lastName;

      return plainToClass(UserDto, await this.save(userEntity));
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error.code === '23505') {
        throw new ConflictException('Username or user already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findUserById(id: string): Promise<UserDto> {
    return plainToClass(UserDto, await this.findOneOrFail(id));
  }

  async updateUserFcmToken({ id }: UserDto, updateFcmTokenDto: UpdateFcmTokenDto): Promise<UserDto> {
    const userEntity = await this.findUserById(id);
    userEntity.fcmToken = updateFcmTokenDto.fcmToken;

    return plainToClass(UserDto, await this.save(userEntity));
  }
}
