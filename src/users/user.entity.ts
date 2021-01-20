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

import {
    Column,
    Entity,
} from 'typeorm';
import { Roles } from 'src/constants/Roles';
import { BaseEntity } from "../core/base.entity";

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {

    @Column({ unique: true, nullable: true })
    firebaseUid: string;

    @Column()
    lastName: string;

    @Column()
    firstName: string;

    @Column({ unique: true })
    username: string;

    @Column()
    email: string;

    @Column({ default: false })
    emailVerified: boolean;

    @Column()
    emailVerificationToken: string;

    @Column({ default: 15 })
    startMoney: number;

    @Column({ nullable: true })
    fcmToken: string;

    @Column({ default: Roles.USER })
    roles: number;
}
