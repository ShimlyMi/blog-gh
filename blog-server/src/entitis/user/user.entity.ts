import { BaseColumn } from '../baseColumnAbstract/base';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends BaseColumn {
  @Column({
    type: 'varchar',
    nullable: false,
    comment: '用户名 唯一',
  })
  username: string;

  @Column({
    type: 'char',
    nullable: false,
    length: 64,
    comment: '用户密码',
  })
  password: string;

  @Column({
    type: 'varchar',
    comment: '用户昵称',
  })
  nickname: string;

  @Column({
    type: 'tinyint',
    comment: '用户角色 1 管理员 2 普通用户',
    default: 1,
  })
  role: string;

  @Column({
    type: 'varchar',
    comment: '用户头像',
  })
  avatar: string;
}
