import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
// import { JoinTable } from 'typeorm/browser';
import { BaseColumn } from '../../baseColumnAbstract/baseColumn';
import { User } from '../../user/entities/user.entity';
// import { TalkPhoto } from './talk-photo.entity';
import { TalkPhoto } from '../../talk-photos/entities/talk-photo.entity';

@Entity()
export class Talk extends BaseColumn {
  @Column({
    type: 'varchar',
    comment: '说说内容',
  })
  content: string;

  // @Column({
  //   type: 'varchar',
  //   comment: '说说图片',
  // })
  // talkPic: string[];

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;

  @OneToMany(() => TalkPhoto, (talkPhoto) => talkPhoto.url, { eager: true })
  @JoinColumn()
  talkPic: TalkPhoto[];

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
  like_times: number;
}
