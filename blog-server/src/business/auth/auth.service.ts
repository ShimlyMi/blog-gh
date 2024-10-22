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
    console.log(username);
    const userQuery = { username: username };
    const user = await this.userService.findUserInfoByUsername(userQuery);
    console.log('user', user);
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
    console.log(payload);
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
    return ResultData.messageSuccess(user, '获取用户信息成功成功');
  }
}
