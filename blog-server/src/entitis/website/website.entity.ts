import { Column, Entity } from 'typeorm';
import { BaseColumn } from '../baseColumnAbstract/base';

// @Entity()
// export class WebsiteEntity = new EntitySchema({
//   name: "website",
//   columns: {
//     ...BaseColumnSchema,
//     blogName: {
//       type: "string",
//
//     }
//   }
// })
@Entity()
export class WebsiteEntity extends BaseColumn {
  @Column({
    type: 'varchar',
    length: 55,
    comment: '博客头像',
  })
  blogName: string;

  @Column({
    type: 'varchar',
    comment: '博客头像',
  })
  blogAvatar: string;
}
