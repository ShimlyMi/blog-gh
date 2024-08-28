import { Column, Entity } from 'typeorm';
import { BaseColumn } from '../../baseColumnAbstract/baseColumn';

@Entity()
export class User extends BaseColumn {
  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
    comment: '用户名,唯一',
  })
  username: string;

  @Column({
    type: 'char',
    length: 64,
    nullable: false,
    comment: '密码',
  })
  password: string;

  @Column({
    type: 'tinyint',
    nullable: false,
    comment: '用户角色 1 管理员 2 普通用户',
    default: 2,
  })
  role: number;

  @Column({
    type: 'varchar',
    comment: '用户昵称',
  })
  nickname: string;

  @Column({
    type: 'varchar',
    comment: '用户头像',
    default: 'http://127.0.0.1:8888/665d7417ccaa2b7287f6da700.jpg',
  })
  avatar: string;
}
