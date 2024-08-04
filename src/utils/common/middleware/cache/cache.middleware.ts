import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { RedisService } from 'src/services/redis/redis.service';


@Injectable()
export class CacheMiddleware implements NestMiddleware {
    constructor(private readonly redisService: RedisService) { }

    async use(req: Request, res: Response, next: () => void) {
        if (req.method === 'GET') {
            const cacheKey = req.originalUrl;
            const cachedResponse = await this.redisService.getRedisClient().get(cacheKey);
            if (cachedResponse) {
                return res.status(HttpStatus.OK).json(JSON.parse(cachedResponse));
            }
        }
        next();
    }
}
