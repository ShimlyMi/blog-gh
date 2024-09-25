import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { jwtConstants } from './constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly jwtSecret: any = jwtConstants.secret;
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(userInfo: any) {
    const { username, password } = userInfo;
    const user = await this.userService.findOne(username);
    // console.log('user', user);
    const passV = await this.userService.validatePassword(
      user.data.password,
      password,
    );
    // console.log(passV);
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
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async decryptToken(token: string) {
    const user = this.jwtService.verify(token, this.jwtSecret);
    return user;
  }
}
