import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ResultData } from '../../common/utils/result';
import { ErrorCode } from '../../common/constants/constants';
import { create } from '../../common/utils/transaction';
import { decrypt } from 'dotenv';

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
  async validateName(username?: string, nickname?: string): Promise<boolean> {
    try {
      const res = await this.userRepository
        .createQueryBuilder('user')
        .select()
        .where(`user.username like :username OR user.nickname like :nickname`, {
          username: `%${username}%`,
          nickname: `%${nickname}%`,
        })
        .getCount();
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
      const res = await this.validateName(data.username);
      if (res || data.username === 'admin' || data.username.includes('admin')) {
        return ResultData.messageFail(ErrorCode.USER, '该用户名已存在', '');
      }
      const hashedPassword = await this.hashPassword(data.password);
      data.password = hashedPassword;
      // console.log(data)
      return await create(this.userRepository, User, {
        username: data.username,
        password: data.password,
        nickname: data.nickname,
      });
    } catch (err) {
      console.error(err);
      return ResultData.messageFail(ErrorCode.CATEGORY, '新增用户失败', '');
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
      return ResultData.messageFail(ErrorCode.CATEGORY, '查询用户失败', '');
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
      return ResultData.messageFail(ErrorCode.CATEGORY, '获取用户列表失败', '');
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
