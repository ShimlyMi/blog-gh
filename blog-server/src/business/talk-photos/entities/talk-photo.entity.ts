import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Talk } from '../../talk/entities/talk.entity';
import { BaseColumn } from '../../baseColumnAbstract/baseColumn';

@Entity()
export class TalkPhoto extends BaseColumn {
  @OneToOne(() => Talk)
  @JoinColumn()
  talkId: Talk;

  @Column({
    type: 'varchar',
    comment: '图片地址',
  })
  url: string;
}
