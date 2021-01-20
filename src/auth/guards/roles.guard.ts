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

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from "../../constants/Roles";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
      private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndMerge<Roles[]>('roles', [
      context.getClass(),
      context.getHandler(),
    ]) || [];

    const isPublic = this.reflector.getAllAndOverride<boolean>('public', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles || isPublic) {
      return true;
    }

    let isAllowed = false;

    roles.forEach(role => {
      if ((context.switchToHttp().getRequest().request.user.roles & role) === role) {
        isAllowed = true;
      }
    });

    return isAllowed;
  }
}
