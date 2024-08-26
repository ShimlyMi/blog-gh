import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseColumn } from '../baseColumnAbstract/base';
import Upload from '../upload/upload.entity';

@Entity()
export class Website extends BaseColumn {
  @Column({
    type: 'varchar',
    length: 55,
    comment: '博客名称',
    default: '米娜的小屋',
  })
  blogName: string;

  // @Column({
  //   type: 'varchar',
  //   comment: '博客头像',
  //   default: 'http://127.0.0.1:8888/d534c7552f7a63793b1e00001.jpg',
  // })
  // blogAvatar: string;

  @JoinColumn({ name: 'blogAvatarId' })
  @OneToOne(() => Upload, {
    nullable: false,
  })
  public blogAvatar?: Upload;

  @Column({ nullable: false })
  public blogAvatarId?: number;

  @JoinColumn({ name: 'avatarBgId' })
  @OneToOne(() => Upload, {
    nullable: false,
  })
  public avatarBg?: Upload;

  @Column({ nullable: false })
  public avatarBgId?: number;

  // @Column({
  //   type: 'varchar',
  //   comment: '博客头像背景图',
  //   default: 'http://127.0.0.1:8888/f56d6e7a0657cee8354612700.jpg',
  // })
  // avatarBg: string;

  @Column({
    type: 'varchar',
    comment: '个性签名',
    default: '这个博主很懒，什么也没有留下~',
  })
  personalSignature: string;

  @Column({
    type: 'varchar',
    comment: '博客网站公告',
    default: '暂无公告，敬请期待！',
  })
  blogNotice: string;

  @Column({
    type: 'int',
    comment: '博客网站浏览量',
    default: 0,
  })
  viewTimes: number;
}
