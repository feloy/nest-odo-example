import { Injectable } from '@nestjs/common';
import { DbService } from './db.service';

@Injectable()
export class AppService {
  constructor(private readonly db: DbService) {}

  async getHello(): Promise<string> {
    return "=> " + await this.db.selectOne() + "\n";
  }
}
