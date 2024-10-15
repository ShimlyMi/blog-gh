import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { BaseColumn } from '../../baseColumnAbstract/baseColumn';
import { User } from '../../user/entities/user.entity';

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
    unique: true,
    comment: '权限数字',
  })
  value: string;

  @OneToMany(() => User, (user) => user.id)
  @JoinColumn()
  userId: User[];
}
