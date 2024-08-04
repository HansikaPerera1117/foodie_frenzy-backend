import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { FileRepository } from './infrastructure/file.repository';
import { FileType } from './domain/file';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import { FilterFilesDto, SortFilesDto } from './dto/query-file.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { InfinityPaginationResultType } from 'src/utils/types/infinity-pagination-result.type';
import sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {
  constructor(
    private readonly configService: ConfigService<AllConfigType>,
    private readonly fileRepository: FileRepository,
  ) {}

  async create(
    file: Express.Multer.File | Express.MulterS3.File,
  ): Promise<FileType> {
    if (!file) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: { file: 'You have to provide a file' },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    // Paths storage
    const paths = {
      original: '',
      small: '',
      medium: '',
      large: '',
    };

    // Storage configurations
    const driver = this.configService.getOrThrow('file.driver', {
      infer: true,
    });
    const apiPrefix = this.configService.get('app.apiPrefix', { infer: true });

    if (driver === 'local') {
      const basePath = `/${apiPrefix}/files/`;
      paths.original = basePath + 'original/' + file.filename;

      // Generate paths and resize images
      const sizes = [
        { suffix: 'small', width: 320 },
        { suffix: 'medium', width: 640 },
        { suffix: 'large', width: 1280 },
      ];

      await Promise.all(
        sizes.map(async (size) => {
          const newPath = basePath + `${size.suffix}/${file.filename}`;
          const basePathForFileStorage = path.resolve(__dirname, '../../files');

          const dir = path.join(basePathForFileStorage, size.suffix);
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }

          await sharp(file.path)
            .resize(size.width)
            .toFile(
              path.join(basePathForFileStorage, size.suffix, file.filename),
            );
          paths[size.suffix] = newPath;
        }),
      );
    } else if (driver === 's3') {
      // S3 storage uses the location provided by multerS3
      paths.original = (file as Express.MulterS3.File).location;

      const sizes = [
        { suffix: 'small', width: 320 },
        { suffix: 'medium', width: 640 },
        { suffix: 'large', width: 1280 },
      ];

      await Promise.all(
        sizes.map(async (size) => {
          const newPath = `${size.suffix}/${file.filename}`;
          await sharp(file.path)
            .resize(size.width)
            .toBuffer()
            .then(async (buffer) => {
              const s3path = await this.uploadToS3(
                buffer,
                newPath,
                file.mimetype,
              );
              paths[size.suffix] = s3path;
            });
        }),
      );
    }

    return await this.fileRepository.create({
      originalName: file.originalname,
      originalPath: paths.original,
      smallPath: paths.small,
      mediumPath: paths.medium,
      largePath: paths.large,
    });
  }

  // Utility function to handle S3 uploads
  private async uploadToS3(
    buffer: Buffer,
    filename: string,
    mimetype: string,
  ): Promise<string> {
    // Upload logic to S3
    // Implementation depends on how you have configured AWS SDK
    return 's3-bucket-url/' + filename; // Dummy URL, replace with actual upload logic
  }

  findOne(fields: EntityCondition<FileType>): Promise<NullableType<FileType>> {
    return this.fileRepository.findOne(fields);
  }

  async deleteFile(id: string): Promise<void> {
    // This call abstracts away the complexities of database and storage operations
    await this.fileRepository.softDeleteAndRemoveStorage(id);
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterFilesDto | null;
    sortOptions?: SortFilesDto[] | null;
    paginationOptions: IPaginationOptions;
  }) {
    return this.fileRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }
}
