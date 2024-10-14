import { Column, Entity } from 'typeorm';
import { BaseColumn } from '../../baseColumnAbstract/baseColumn';

@Entity()
export class Role extends BaseColumn {
  @Column({
    type: 'varchar',
    length: 55,
    unique: true,
    comment: '角色名称',
  })
  real_name: string;

  @Column({
    type: 'tinyint',
    length: 55,
    unique: true,
    comment: '权限数字',
  })
  value: string;
}
