import { Module } from '@nestjs/common';
import { RedisModule } from 'src/services/redis/redis.module';
import { CacheMiddleware } from './cache.middleware';

@Module({
    imports: [RedisModule],
    providers: [CacheMiddleware],
    exports: [CacheMiddleware], // Export if needed
})
export class CacheModule { }
