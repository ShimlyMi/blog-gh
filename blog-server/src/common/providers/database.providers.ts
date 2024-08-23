import { DataSource } from 'typeorm';
import * as process from 'process';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const datasource = new DataSource({
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: +process.env.MYSQL_PORT,
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PWD,
        database: process.env.MYSQL_DB,
        autoLoadEntities: true,
        synchronize: true,
      });

      return datasource.initialize();
    },
  },
];
