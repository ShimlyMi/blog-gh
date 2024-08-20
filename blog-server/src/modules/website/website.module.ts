import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebsiteService } from './website.service';
import { Website } from '../../entitis/website/website.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Website]),
    // TypeOrmModule.forFeature({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'root',
    //   database: 'blog',
    //   entities: [WebsiteEntity],`
    //   // synchronize: true,
    // }),
  ],
  providers: [WebsiteService],
})
export class WebsiteModule {}
