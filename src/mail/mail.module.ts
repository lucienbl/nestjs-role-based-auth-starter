import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { MailerModule } from "@nestjs-modules/mailer";
import { PugAdapter } from "@nestjs-modules/mailer/dist/adapters/pug.adapter";
import { MailService } from './mail.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
        }
      },
      defaults: {
        from: "NestJS Template <noreply@example.com>",
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
