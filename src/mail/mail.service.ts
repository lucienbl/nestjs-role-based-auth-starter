import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(
    private readonly mailerService: MailerService
  ) {}

  async sendStudentVerificationCode(to: string, verificationCode: string) {
    try {
      return this.mailerService.sendMail({
        to,
        subject: "Your student verification code !",
        template: __dirname + '/templates/student-verification',
        context: {
          verificationCode,
        }
      });
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
