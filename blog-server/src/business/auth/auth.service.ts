import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { jwtConstants } from './constants';
import { JwtService } from '@nestjs/jwt';
import { ResultData } from '../../common/utils/result';

@Injectable()
export class AuthService {
  private readonly jwtSecret: any = jwtConstants.secret;
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(userInfo: { username: string; password: string }) {
    const { username, password } = userInfo;
    const user = await this.userService.findOne(username);
    // console.log('user', user);
    const passV = await this.userService.validatePassword(
      user.data.password,
      password,
    );
    console.log(passV);
    if (!passV) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.data.id,
      username: user.data.username,
      avatar: user.data.avatar,
      nickname: user.data.nickname,
      role: user.data.role,
    };
    const access_token = await this.jwtService.signAsync(payload);
    // let r = await this.decryptToken(access_token)
    // console.log(r)
    return ResultData.messageSuccess(
      {
        username: user.data.username,
        avatar: user.data.avatar,
        nickname: user.data.nickname,
        role: user.data.role,
        access_token: access_token,
      },
      '登录成功',
    );
  }

  async decryptToken(token: string) {
    const user = this.jwtService.verify(token, this.jwtSecret);
    return user;
  }
}
