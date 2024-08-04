import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Redis from 'ioredis';
import { RedisConfig } from './config/redis-config.type';

@Injectable()
export class RedisService {
  private readonly redisClient: Redis.Redis;

  constructor(private configService: ConfigService<RedisConfig>) {
    this.redisClient = new Redis.Redis({
      host: this.configService.get('host', { infer: true }), // Set your Redis server host
      port: this.configService.get('port', { infer: true }), // Set your Redis server port
      // Add other configuration options as needed
    });
  }

  getRedisClient(): Redis.Redis {
    return this.redisClient;
  }

  async setOtp(mobileNumber: string, expireTime: number, otp: number) {
    return this.redisClient.setex(mobileNumber, expireTime, otp);
  }

  getOtp = (mobileNumber: string): Promise<string | null> =>
    this.redisClient.get(mobileNumber);
}
