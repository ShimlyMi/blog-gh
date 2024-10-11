import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { AuthGuard } from './auth.guard';
import { Public } from './constants';
import { ResultData } from '../../common/utils/result';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return ResultData.messageSuccess(
      {
        id: req.user.sub,
        username: req.user.username,
        nickname: req.user.nickname,
        avatar: req.user.avatar,
        role: req.user.role,
      },
      '获取登录信息成功',
    );
  }
}
