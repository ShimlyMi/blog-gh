import { Column, Entity } from 'typeorm';
import { BaseColumn } from '../../baseColumnAbstract/baseColumn';

@Entity()
export class Tag extends BaseColumn {
  @Column({
    type: 'varchar',
    length: 55,
    unique: true,
    comment: '标签名称 唯一',
  })
  tagName: string;
}
