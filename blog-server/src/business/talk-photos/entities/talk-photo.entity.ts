import { Column, Entity } from 'typeorm';
import { BaseColumn } from '../../baseColumnAbstract/baseColumn';

@Entity()
export class TalkPhoto extends BaseColumn {
  @Column({
    type: 'json',
    comment: '图片地址',
  })
  url: any[];
}
