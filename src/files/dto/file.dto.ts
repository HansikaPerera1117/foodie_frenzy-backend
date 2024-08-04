import { ApiProperty } from '@nestjs/swagger';
import { FileType } from '../domain/file';
import { IsString } from 'class-validator';

export class FileDto implements FileType {
  @ApiProperty()
  @IsString()
  id: string;

  originalName: string;

  originalPath: string;

  smallPath: string;

  mediumPath: string;

  largePath: string;
}
