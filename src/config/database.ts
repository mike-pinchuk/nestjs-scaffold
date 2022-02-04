import { config } from 'dotenv';
import * as path from 'path';

config();

export default {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [path.join('dist', '**', '*.entity.{ts,js}')],
  synchronize: true,
  migrations: ['dist/migrations/**/*.js'],
  cli: { migrationsDir: 'src/migrations' },
};
