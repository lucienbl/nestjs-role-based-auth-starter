import { Injectable } from '@nestjs/common';
import { messaging } from 'firebase-admin';
import UserDto from "../users/dto/user.dto";

@Injectable()
export class NotificationsService {

  async sendUserNotification(userDto: UserDto, title: string, body: string) {
    if (userDto.fcmToken) {
      return messaging().sendToDevice(userDto.fcmToken, {
        notification: {
          title,
          body
        }
      });
    }

    return null;
  }
}
