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

import { Exclude, Expose } from "class-transformer";
import IBase from "../../core/base.interface";
import { UserEntity } from "../user.entity";

export class IUser extends IBase implements UserEntity {

  @Exclude({ toPlainOnly: true })
  firebaseUid: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  emailVerified: boolean;

  @Exclude({ toPlainOnly: true })
  emailVerificationToken: string;

  @Expose()
  startMoney: number;

  @Exclude({ toPlainOnly: true })
  fcmToken: string;

  @Expose()
  roles: number;
}

export default IUser;
