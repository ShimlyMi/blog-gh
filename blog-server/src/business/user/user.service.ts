import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ResultData } from '../../common/utils/result';
import { ErrorCode } from '../../common/constants/constants';
import { update } from '../../common/utils/transaction';
import { RoleService } from '../role/role.service';

@Injectable()
export class UserService {
  constructor(
    private roleService: RoleService,

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
    console.log(createUserDto);
    try {
      const data = createUserDto;
      const res = await this.validateName('username', data.username);
      const roles = await this.roleService.find();
      // console.log(roles)
      const user = new User();
      data.password = await this.hashPassword(data.password);
      user.username = data.username;
      user.password = data.password;
      user.nickname = data.nickname;
      if (
        (res && data.username === 'admin') ||
        data.username.includes('admin')
      ) {
        return ResultData.messageFail(
          ErrorCode.USER,
          '不可创建此用户名，请重新输入',
        );
      } else {
        user.role = roles.data[1];
        await this.userRepository.save(user);
        return ResultData.messageSuccess(
          {
            id: user.id,
            username: user.username,
            nickname: user.nickname,
            avatar: user.avatar,
            role: user.role,
          },
          '新增用户成功',
        );
      }
      // console.log(data)
    } catch (err) {
      console.error(err);
      return ResultData.messageFail(ErrorCode.USER, '新增用户失败');
    }
  }

  async findUserInfoByUsername(data: any) {
    try {
      const { username } = data;
      const res = await this.userRepository.findOne({
        select: ['id', 'username', 'password', 'nickname', 'avatar', 'role'],
        where: { username: username },
      });
      const roles = await this.roleService.findOne(res.role.id);
      return ResultData.messageSuccess(
        {
          id: res.id,
          username: res.username,
          nickname: res.nickname,
          password: res.password,
          avatar: res.avatar,
          role: roles.data,
        },
        '查询用户成功',
      );
    } catch (err) {
      console.error(err);
      return ResultData.messageFail(ErrorCode.USER, '查询用户失败');
    }
  }

  async findOneByUserId(id: number) {
    try {
      const res = await this.userRepository
        .createQueryBuilder('user')
        .select('user.id')
        .where(`user.id = :id`, {
          id: id,
        })
        .getOne();
      return ResultData.messageSuccess(res, '获取用户列表成功');
    } catch (err) {
      console.error(err);
      // return false
      return ResultData.messageFail(ErrorCode.USER, '查询用户失败');
    }
  }

  async findAll() {
    try {
      const res = await this.userRepository.find({
        select: ['id', 'username', 'password', 'nickname', 'avatar', 'role'],
        relations: ['role'],
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
