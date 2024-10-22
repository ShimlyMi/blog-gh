import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Repository } from 'typeorm';
import { create } from '../../common/utils/transaction';
import { RoleNameEnum, RoleValueEnum } from '../../enum/role.enum';
import { ResultData } from '../../common/utils/result';
import { ErrorCode } from '../../common/constants/constants';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    try {
      const dataValue = createRoleDto;
      if (dataValue.value === '1') {
        const real_name = RoleNameEnum.ADMIN;
        return await create(this.roleRepository, Role, {
          real_name: real_name,
          value: dataValue.value,
        });
      } else if (dataValue.value === '2') {
        const real_name = RoleNameEnum.COMMON;
        return await create(this.roleRepository, Role, {
          real_name: real_name,
          value: dataValue.value,
        });
      }
    } catch (err) {
      console.error(err);
      return ResultData.messageFail(ErrorCode.USER, '新增角色失败');
    }
  }

  async find() {
    try {
      const res = await this.roleRepository.find({
        select: ['id', 'real_name', 'value'],
      });
      return ResultData.messageSuccess(res, '查询角色信息成功');
    } catch (err) {
      console.error(err);
      return ResultData.messageFail(ErrorCode.USER, '查询角色信息失败');
    }
  }

  async findOne(id: number) {
    try {
      const res = await this.roleRepository.findOne({
        select: ['id', 'real_name', 'value'],
        where: { id: id },
      });
      return ResultData.messageSuccess(
        [
          {
            real_name: res.real_name,
            value: res.value,
          },
        ],
        '查询角色信息成功',
      );
    } catch (err) {
      console.error(err);
      return ResultData.messageFail(ErrorCode.USER, '查询角色信息失败');
    }
  }
}
