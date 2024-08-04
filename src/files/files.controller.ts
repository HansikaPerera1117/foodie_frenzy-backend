import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Response,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FilesService } from './files.service';
import { InfinityPaginationResultType } from 'src/utils/types/infinity-pagination-result.type';
import { FileType } from './domain/file';
import * as path from 'path';
import * as fs from 'fs';

@ApiTags('Files')
@Controller({
  path: 'files',
})
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File | Express.MulterS3.File,
  ) {
    return this.filesService.create(file);
  }

  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  @Post('uploadMultiple')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('files'))
  async uploadMultipleFiles(
    @UploadedFiles() files: Array<Express.Multer.File | Express.MulterS3.File>,
  ) {
    const responses: any = [];
    for (const file of files) {
      const response = await this.filesService.create(file); // Assuming create method can handle single file object
      responses.push(response);
    }
    return responses;
  }

  @Get(':size/:filename')
  @ApiParam({
    name: 'size',
    enum: ['original', 'small', 'medium', 'large'],
    description: 'Image size',
  })
  download(
    @Param('size') size: string,
    @Param('filename') filename: string,
    @Response() response,
  ) {
    // Validate size parameter
    if (!['original', 'small', 'medium', 'large'].includes(size)) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('Invalid size parameter');
    }

    // const filePath = path.resolve(__dirname, `../../files/${size}/${filename}`);

    // // Check if the file exists
    // if (!fs.existsSync(filePath)) {
    //   return response.status(HttpStatus.NOT_FOUND).send('File not found');
    // }

    // Send the file
    return response.sendFile(`${size}/${filename}`, { root: './files' });
  }

  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the file to delete',
    type: 'string',
  })
  async deleteFile(@Param('id') id: string) {
    return this.filesService.deleteFile(id);
  }

  @Get('find-all')
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  async findAll(
    @Query('pages', { transform: (value) => (value ? Number(value) : 1) })
    pages?: number,
    @Query('limits', { transform: (value) => (value ? Number(value) : 100) })
    limits?: number,
  ) {
    const page = pages ?? 1;
    let limit = limits ?? 10000;

    const paginationResult = await this.filesService.findManyWithPagination({
      filterOptions: {},
      sortOptions: [],
      paginationOptions: {
        page,
        limit,
      },
    });

    // Extract total records from pagination result
    const { totalRecords } = paginationResult;

    return {
      ...paginationResult,
      totalRecords,
    };
  }
}
