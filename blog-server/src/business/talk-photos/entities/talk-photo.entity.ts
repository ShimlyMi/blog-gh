import { Column, Entity, ManyToOne } from 'typeorm';
import { Talk } from '../../talk/entities/talk.entity';
import { BaseColumn } from '../../baseColumnAbstract/baseColumn';

@Entity()
export class TalkPhoto extends BaseColumn {
  @ManyToOne(() => Talk, (talk) => talk.talkPic)
  talk: TalkPhoto[];

  @Column({
    type: 'varchar',
    comment: '图片地址',
  })
  url: string[];
}
