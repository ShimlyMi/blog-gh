import { Injectable, Query } from '@nestjs/common';
import { User } from '../../entities/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
  ) {}

  createUser(createUserDto: CreateUserDto) {
    const data = new User();
    data.username = createUserDto.username;
    data.password = createUserDto.password;
    data.nickname = createUserDto.nickname;
    data.avatar = createUserDto.avatar;

    if (data.username === 'admin') {
      data.role = 1;
    }

    return this.user.save(data);
  }
}
