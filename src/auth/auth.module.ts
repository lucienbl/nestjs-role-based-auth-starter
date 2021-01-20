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

import { HttpModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FirebaseAuthStrategy } from './strategies/firebase-auth.strategy';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthRepository } from "./auth.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthRepository]),
    PassportModule,
    HttpModule,
  ],
  providers: [
    FirebaseAuthStrategy,
  ],
})
export class AuthModule {}
