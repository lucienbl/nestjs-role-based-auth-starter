import { Injectable, ForbiddenException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>
  ) {}

  async findByUsername(username: string): Promise<Users | undefined> {
    return this.usersRepository.createQueryBuilder("users").where("users.username = :username", { username }).getOne();
  }

  async createUser(user: Users): Promise<Users> {
    if ((await this.usersRepository.find({ username: user.username })).length > 0) {
      throw new ForbiddenException("A user with this username already exists.");
    }
    return (await this.usersRepository.insert(user)).raw;
  }
}