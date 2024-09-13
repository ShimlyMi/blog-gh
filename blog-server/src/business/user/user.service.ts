import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ResultData } from '../../common/utils/result';
import { ErrorCode } from '../../common/constants/constants';
import { create, update } from '../../common/utils/transaction';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /** 哈希加密密码 */
  async hashPassword(password: string): Promise<string> {
    // 生成 salt
    const salt = bcrypt.genSaltSync(10);
    // 使用 salt 加密密码
    return bcrypt.hashSync(password, salt);
  }
  /** 验证用户名和昵称是否存在 */
  async validateName(type: string, value: string): Promise<boolean> {
    try {
      let res: any;
      if (type === 'username' || type === 'nickname') {
        res = await this.userRepository
          .createQueryBuilder('user')
          .select()
          .where(
            `user.username like :username OR user.nickname like :nickname`,
            {
              username: `%${value}%`,
              nickname: `%${value}%`,
            },
          )
          .getCount();
      }
      return res > 0;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
  /** 验证密码是否正确 */
  async validatePassword(
    hashPassword: string,
    enteredPassword: string,
  ): Promise<boolean> {
    return bcrypt.compareSync(enteredPassword, hashPassword);
  }

  /** 创建用户 */
  async createUser(createUserDto: CreateUserDto) {
    try {
      const data = createUserDto;
      const res = await this.validateName('username', data.username);
      if (res || data.username === 'admin' || data.username.includes('admin')) {
        return ResultData.messageFail(ErrorCode.USER, '该用户名已存在');
      }
      data.password = await this.hashPassword(data.password);
      // console.log(data)
      return await create(this.userRepository, User, {
        username: data.username,
        password: data.password,
        nickname: data.nickname,
      });
    } catch (err) {
      console.error(err);
      return ResultData.messageFail(ErrorCode.USER, '新增用户失败');
    }
  }

  async findOne(data: any) {
    try {
      const { id, username } = data;
      const res = await this.userRepository.findOne({
        select: ['id', 'username', 'password', 'nickname', 'avatar', 'role'],
        where: [{ id: id }, { username: username }],
      });
      return ResultData.messageSuccess(res, '查询用成功');
    } catch (err) {
      console.error(err);
      return ResultData.messageFail(ErrorCode.USER, '查询用户失败');
    }
  }

  async findAll() {
    try {
      const res = await this.userRepository.find({
        select: ['id', 'username', 'nickname', 'role'],
        order: { id: 'DESC' },
      });
      return ResultData.messageSuccess(res, '获取用户列表成功');
    } catch (err) {
      console.error(err);
      return ResultData.messageFail(ErrorCode.USER, '获取用户列表失败');
    }
  }

  // async updateUser(id: number, type: string, updateUserDto: UpdateUserDto) {
  //   try {
  //     const user = new User();
  //     switch (type) {
  //       case 'password':
  //         const passV = await this.validatePassword(
  //           updateUserDto.password,
  //           user.password,
  //         );
  //         if (passV) {
  //           return ResultData.messageFail(
  //             ErrorCode.USER,
  //             '新密码不可与原密码一致，请重新输入',
  //           );
  //         }
  //         return await update(
  //           this.userRepository,
  //           { password: updateUserDto.password },
  //           User,
  //           'id = :id',
  //           { id: id },
  //         );
  //       case 'nickname':
  //         const nicknameV = await this.validateName(
  //           'nickname',
  //           updateUserDto.nickname,
  //         );
  //         if (nicknameV) {
  //           return ResultData.messageFail(
  //             ErrorCode.USER,
  //             '该昵称已被使用，请换一个',
  //           );
  //         }
  //         return await update(
  //           this.userRepository,
  //           { nickname: updateUserDto.nickname },
  //           User,
  //           'id = :id',
  //           { id: id },
  //         );
  //     }
  //   } catch (err) {}
  // }

  /** 更新密码 */
  async updatePassword(id: number, newPassword: string) {
    try {
      const user = new User();
      const passV = await this.validatePassword(newPassword, user.password);
      if (passV) {
        return ResultData.messageFail(
          ErrorCode.USER,
          '新密码不可与原密码一致，请重新输入',
        );
      }
      return await update(
        this.userRepository,
        { password: newPassword },
        User,
        'id = :id',
        { id: id },
      );
    } catch (err) {
      console.error(err);
      return ResultData.messageFail(ErrorCode.USER, '更新密码失败');
    }
  }

  /** 更新用户昵称 */
  async updateNickname(id: number, newNickname: string) {
    try {
      const nicknameV = await this.validateName('nickname', newNickname);
      if (nicknameV) {
        return ResultData.messageFail(
          ErrorCode.USER,
          '该昵称已被使用，请换一个',
        );
      }
      return await update(
        this.userRepository,
        { nickname: newNickname },
        User,
        'id = :id',
        { id: id },
      );
    } catch (err) {
      console.error(err);
      return ResultData.messageFail(ErrorCode.USER, '更新用户昵称失败');
    }
  }
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
