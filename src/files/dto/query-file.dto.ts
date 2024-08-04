import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type, plainToInstance } from 'class-transformer';
import {
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { FileType } from '../domain/file';

export class QueryFilesDto {
    @ApiProperty({
        required: false,
    })
    @Transform(({ value }) => (value ? Number(value) : 1))
    @IsNumber()
    @IsOptional()
    page: number;

    @ApiProperty({
        required: false,
    })
    @Transform(({ value }) => (value ? Number(value) : 10))
    @IsNumber()
    @IsOptional()
    limit: number;

    @ApiProperty({ type: String, required: false })
    @IsOptional()
    @Transform(({ value }) => {
        return value
            ? plainToInstance(SortFilesDto, JSON.parse(value))
            : undefined;
    })
    @ValidateNested({ each: true })
    @Type(() => SortFilesDto)
    sort?: SortFilesDto[] | null;

    @ApiProperty({ type: String, required: false })
    @IsOptional()
    @Transform(({ value }) =>
        value ? plainToInstance(FilterFilesDto, JSON.parse(value)) : undefined,
    )
    @ValidateNested()
    @Type(() => FilterFilesDto)
    filters?: FilterFilesDto | null;
}

export class SortFilesDto {
    @ApiProperty()
    @IsString()
    orderBy: keyof FileType;

    @ApiProperty()
    @IsString()
    order: string;
}

export class FilterFilesDto {
}
