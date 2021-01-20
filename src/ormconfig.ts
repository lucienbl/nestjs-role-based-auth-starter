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

import { ConnectionOptions } from "typeorm";
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { OptimisticLockingSubscriber } from "./utils/OptimisticLockingSubscriber";

const data: any = dotenv.parse(fs.readFileSync(`.env`));

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: data.DB_USER,
  password: data.DB_PASSWORD,
  database: data.DB_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  migrationsRun: true,
  logging: false,
  logger: 'file',
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  subscribers: [
    OptimisticLockingSubscriber
  ]
};

export = config;
