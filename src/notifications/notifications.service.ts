import { Injectable } from '@nestjs/common';
import { messaging } from 'firebase-admin';
import IUser from "../users/interfaces/user.interface";

@Injectable()
export class NotificationsService {

  async sendUserNotification(userDto: IUser, title: string, body: string) {
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
