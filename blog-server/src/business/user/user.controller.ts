import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from '../auth/constants';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('/register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  // @Public()
  // @Get('/findAll')
  // getUserList() {
  //   return this.userService.findAll();
  // }

  @Public()
  @Get('/findOneByUsername')
  findOne(@Body() data: { username: string }) {
    return this.userService.findUserInfoByUsername(data);
  }
}
