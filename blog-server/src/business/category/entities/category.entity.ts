import { Column, Entity } from 'typeorm';
import { BaseColumn } from '../../baseColumnAbstract/baseColumn';

@Entity()
export class Category extends BaseColumn {
  @Column({
    type: 'varchar',
    length: 55,
    unique: true,
    comment: '分类名称 唯一',
  })
  category_name: string;
}
