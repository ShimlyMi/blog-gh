import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseColumn } from '../../baseColumnAbstract/baseColumn';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Talk extends BaseColumn {
  @Column({
    type: 'varchar',
    comment: '说说内容',
  })
  content: string;

  @ManyToOne(() => User, (user) => user.id, {
    cascade: true, // 启用级联操作，如保存时自动保存关联的User
  })
  user: number;

  @Column({
    type: 'tinyint',
    comment: '说说状态 1 公开 2 私密 3 回收站',
    default: 1,
  })
  status: number;

  @Column({
    type: 'tinyint',
    comment: '是否置顶 1 置顶 2 不置顶',
    default: 2,
  })
  isTop: number;

  @Column({
    type: 'int',
    comment: '点赞次数',
    default: 0,
  })
  likeTimes: number;
}
