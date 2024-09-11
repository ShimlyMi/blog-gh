import { Column, Entity, ManyToOne } from 'typeorm';
import { Talk } from '../../talk/entities/talk.entity';
import { BaseColumn } from '../../baseColumnAbstract/baseColumn';

@Entity()
export class TalkPhoto extends BaseColumn {
  @ManyToOne(() => Talk, (talk) => talk.id, {
    cascade: true, // 启用级联操作，如保存时自动保存关联的talk
  })
  talk: number;

  @Column({
    type: 'varchar',
    comment: '图片地址',
  })
  url: string;
}
