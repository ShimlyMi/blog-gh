import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WebsiteEntity } from '../../entity/websiteEntity/website.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WebsiteService {
  constructor(
    @InjectRepository(WebsiteEntity)
    private websiteRepository: Repository<WebsiteService>,
  ) {}
  async createTable() {
    let res = this.websiteRepository.create()
    return res
  }
}
