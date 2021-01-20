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

import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
// noinspection TypeScriptCheckImport
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import { auth } from 'firebase-admin';
import { AuthRepository } from "../auth.repository";
import { Reflector } from "@nestjs/core";

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(Strategy, 'firebase-auth') {
    constructor(
      private readonly reflector: Reflector,
      private readonly authRepository: AuthRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }

    async validate(token) {
        const firebaseUser: any = await auth()
            .verifyIdToken(token, true)
            .catch((err) => {
                throw new UnauthorizedException(err.message);
            });

        return this.authRepository.findUserByFirebaseUid(firebaseUser.uid);
    }
}
