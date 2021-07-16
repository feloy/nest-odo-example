import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DbService {
    async selectOne(): Promise<string> {
        const pool = new Pool({
          host: process.env.CLUSTER_CLUSTERIP,
          port: 5432,
          database: 'app',
          user: process.env.CLUSTER_USERNAME,
          password: process.env.CLUSTER_PASSWORD,
        })

        const res = await pool.query('SELECT 1 + 1 as result');
        return JSON.stringify(res.rows[0]['result']);
    }
}
