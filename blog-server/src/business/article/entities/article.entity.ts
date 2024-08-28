import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseColumn } from '../../baseColumnAbstract/baseColumn';
import { Tag } from '../../tag/entities/tag.entity';
import { Category } from '../../category/entities/category.entity';

@Entity()
export class ArticleEntity extends BaseColumn {
  @Column({
    type: 'varchar',
    nullable: false,
    comment: '文章标题 不能为空',
  })
  articleTitle: string;

  @Column({
    type: 'int',
    nullable: false,
    default: 1,
    comment: '文章作者 不能为空',
  })
  authorId: number;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '文章描述 不能为空',
  })
  articleDescription: string;

  @Column({
    type: 'text',
    comment: '文章内容',
  })
  articleContent: string;

  @Column({
    type: 'varchar',
    length: 1234,
    comment: '文章缩略图',
  })
  articleCover: string;

  @Column({
    type: 'tinyint',
    default: 2,
    comment: '文章置顶 1 置顶 2 取消置顶',
  })
  isTop: number;

  @Column({
    type: 'tinyint',
    default: 1,
    comment: '文章状态 1 公开 2 私密 3 草稿箱',
  })
  status: number;

  @Column({
    type: 'tinyint',
    default: 1,
    comment: '文章类型 1 原创 2 转载',
  })
  articleTypes: number;

  @Column({
    type: 'varchar',
    length: 1234,
    comment: '原文链接 是转载或翻译的情况下提供',
  })
  originUrl: string;

  @Column({
    type: 'int',
    default: 0,
    comment: '文章访问次数',
  })
  viewTimes: number;

  @Column({
    type: 'int',
    default: 0,
    comment: '文章点赞次数',
  })
  likeTimes: number;

  @Column({
    type: 'double',
    default: 0,
    comment: '文章阅读时长',
  })
  readingDuration: number;

  @OneToOne(() => Category)
  @JoinColumn()
  categoryId: Category;

  @OneToMany(() => Tag, (tag) => tag.id)
  @JoinColumn()
  tagId: Tag[];
}
