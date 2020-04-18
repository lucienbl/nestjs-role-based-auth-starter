import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import sha1 from "crypto-js/sha1";
import { UsersService } from '../users/users.service';
import { Users } from 'src/users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);

    if (user && user.password === sha1(password).toString()) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: Users) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: Users) {
    const payload = { username: user.username, sub: user.id };

    user = {
      ...user, // TODO remove role etc... (=> only keep necessary data from client request)
      password: sha1(user.password).toString()
    };

    try {
      await this.usersService.createUser(user);

      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (e) {
      throw e;
    }
  }
}