import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../entitis/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
})
export class UserModule {}
