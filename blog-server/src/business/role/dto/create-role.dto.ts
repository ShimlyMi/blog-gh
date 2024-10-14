import { RoleNameEnum, RoleValueEnum } from '../../../enum/role.enum';

export class CreateRoleDto {
  real_name: RoleNameEnum;
  value: RoleValueEnum;
}
