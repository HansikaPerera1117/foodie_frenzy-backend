import { AppConfig } from './app-config.type';
// import { AuthConfig } from '../auth/config/auth-config.type';
import { DatabaseConfig } from '../database/config/database-config.type';
import { FileConfig } from '../files/config/file-config.type';
import { RedisConfig } from 'src/services/redis/config/redis-config.type';
// import { MailConfig } from '../mail/config/mail-config.type';


export type AllConfigType = {
  app: AppConfig;
  database: DatabaseConfig;
  file: FileConfig;
  redis: RedisConfig;
};
