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

import { plainToClass } from "class-transformer";
import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from "../users/user.entity";
import IUser from "../users/interfaces/user.interface";

@EntityRepository(UserEntity)
export class AuthRepository extends Repository<UserEntity> {

  async findUserByFirebaseUid(firebaseUid: string): Promise<IUser> {
    return plainToClass(IUser, await this.findOneOrFail({ where: { firebaseUid } }));
  }
}
