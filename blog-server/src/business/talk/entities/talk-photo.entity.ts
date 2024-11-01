import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Talk } from './talk.entity';
import { BaseColumn } from '../../baseColumnAbstract/baseColumn';

@Entity()
export class TalkPhoto extends BaseColumn {
  @Column({
    type: 'json',
    comment: '图片地址',
    nullable: true,
  })
  url: any[];

  // @ManyToOne(() => Talk, (talk) => talk.id)
  // @JoinColumn()
  // talk: Talk;

  // @OneToOne(() => Talk, (talk) => talk.id)
  // @JoinColumn()
  // talk: Talk;
}
