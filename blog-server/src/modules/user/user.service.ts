import {Injectable, Query} from '@nestjs/common';
import { User } from '../../entitis/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
  ) {}

  async create(@Query(params?: Object) query: {})

}
