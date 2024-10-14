import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
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
      const data = createRoleDto;
      if (data.value === 1) {
        const real_name = RoleNameEnum.ADMIN;
        return await create(this.roleRepository, Role, {
          real_name: real_name,
          value: data.value,
        });
      } else if (data.value === 2) {
        const real_name = RoleNameEnum.COMMON;
        return await create(this.roleRepository, Role, {
          real_name: real_name,
          value: data.value,
        });
      }
      return await create(this.roleRepository, Role, {
        real_name: data.real_name,
        value: data.value,
      });
    } catch (err) {
      console.error(err);
      return ResultData.messageFail(ErrorCode.USER, '新增角色失败');
    }
  }

  findAll() {
    return `This action returns all role`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
