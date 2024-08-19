import { EntitySchema } from 'typeorm';
import { BaseColumnSchema } from '../basedColumnSchema/baseColumnSchema';

export const WebsiteEntity = new EntitySchema({
  name: 'website',
  columns: {
    ...BaseColumnSchema,
    blogName: {
      type: 'string',
      length: 55,
      nullable: false,
      default: '米娜的小屋',
      comment: '博客名称',
    },
    blogAvatar: {
      type: 'string',
      comment: '博客头像',
      nullable: false,
      default: 'http://127.0.0.1:8888/d534c7552f7a63793b1e00001.jpg',
    },
    avatarBg: {
      type: 'string',
      comment: '博客头像背景图',
      default: 'http://127.0.0.1:8888/f56d6e7a0657cee8354612700.jpg',
    },
    personalitySignature: {
      type: 'string',
      comment: '个性签名',
      default: '这个博主很懒，什么也没留下~',
    },
    blogNotice: {
      type: 'string',
      comment: '博客公告',
      default: '暂无公告，敬请期待！',
    },
    viewTime: {
      type: 'number',
      comment: '访问博客网站次数',
      default: 0,
    },
  },
});
