import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // @Get('/findOne/:username')
  // findOneByUsername(@Param('username') username: string) {
  //   return this.userService.findOne(username);
  // }

  @Get('/findOne/')
  findOne(
    @Query('username', { required: false }) username?: string,
    @Query('id', ParseIntPipe, { required: false }) id?: number,
  ) {
    // return this.userService.findOne(id);
    if (username) {
      return this.userService.findOne(username);
    } else if (id) {
      return this.userService.findOne(id);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
