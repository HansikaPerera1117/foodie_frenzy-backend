import { registerAs } from '@nestjs/config';
import {
    IsOptional,
    IsInt,
    Min,
    Max,
    IsString,
    ValidateIf,
} from 'class-validator';
import validateConfig from 'src/utils/validate-config';
import { RedisConfig } from './redis-config.type';


class EnvironmentVariablesValidator {
    @ValidateIf((envValues) => !envValues.REDIS_HOST)
    @IsString()
    REDIS_HOST: string;

    @ValidateIf((envValues) => !envValues.REDIS_PORT)
    @IsInt()
    @Min(0)
    @Max(65535)
    @IsOptional()
    REDIS_PORT: number;
}

export default registerAs<RedisConfig>('redis', () => {
    validateConfig(process.env, EnvironmentVariablesValidator);

    return {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
            ? parseInt(process.env.REDIS_PORT, 10)
            : 6379,
    };
});
