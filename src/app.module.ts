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

import { HttpModule, Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from "@nestjs/schedule";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppService } from './app.service';
import * as ormconfig from './ormconfig';
import { NotificationsModule } from './notifications/notifications.module';
import { MailModule } from './mail/mail.module';

export function DatabaseOrmModule(): DynamicModule {
  // noinspection TypeScriptValidateTypes
  return TypeOrmModule.forRoot({ ...ormconfig, autoLoadEntities: true });
}

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseOrmModule(),
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    HttpModule,
    NotificationsModule,
    MailModule,
  ],
  providers: [AppService],
})
export class AppModule {}
