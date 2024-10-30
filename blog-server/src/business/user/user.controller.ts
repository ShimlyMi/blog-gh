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
  @Get('/findInfoByUsername')
  findOne(@Body() data: { username: string }) {
    return this.userService.findUserInfoByUsername(data);
  }

  @Public()
  @Get('/findOneByUsername/:username')
  findOneByUsername(@Param('username') username: string) {
    return this.userService.findOneByUsername(username);
  }

  @Public()
  @Get('/findOneById/:id')
  findOneById(@Param('id') id: string) {
    return this.userService.findOneByUserId(+id);
  }
}
