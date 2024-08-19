import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { WebsiteEntity } from '../entity/websiteEntity/website.entity';

const AppDataSource = new DataSource({
  type: 'mysql',
  username: 'root',
  password: 'root',
  host: 'localhost',
  port: 3306,
  database: 'minablog',
  entities: [WebsiteEntity],
  synchronize: true, //synchronize字段代表是否自动将实体类同步到数据库
  logging: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log('数据库连接成功，创建表成功');
  })
  .catch((error) => console.log(error));
