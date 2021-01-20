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

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as admin from 'firebase-admin';
import { AppModule } from './app.module';
import { NestExpressApplication } from "@nestjs/platform-express";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require("../service-account.json");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require("../package.json");

async function bootstrap() {
  process.env.TZ = "UTC";
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.set('trust proxy', 1);

  app.useGlobalPipes(new ValidationPipe());

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  const options = new DocumentBuilder()
      .setTitle('NestJS Role Based Auth Starter')
      .setVersion(version)
      .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  const port = process.env.PORT || 3001;
  await app.listen(port);

  return port;
}

bootstrap().then(port => console.log(`App successfully started on port ${port} !`));
