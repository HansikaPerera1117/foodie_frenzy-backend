import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from '../entities/file.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { FileMapper } from '../mappers/file.mapper';
import { FileType } from '../../domain/file';

import * as path from 'path';
import * as fs from 'fs'; // Node.js File System module for dealing with local files (if using local storage)
import { promisify } from 'util'; // To use promise-based fs methods
import { FilterFilesDto, SortFilesDto } from 'src/files/dto/query-file.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { InfinityPaginationResultType } from 'src/utils/types/infinity-pagination-result.type';
import { FileRepository } from '../file.repository';

const unlinkAsync = promisify(fs.unlink); // Convert unlink to promise for async/await usage

@Injectable()
export class FileRelationalRepository implements FileRepository {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}

  async create(data: FileType): Promise<FileType> {
    const persistenceModel = FileMapper.toPersistence(data);
    return this.fileRepository.save(
      this.fileRepository.create(persistenceModel),
    );
  }

  async findOne(
    fields: EntityCondition<FileType>,
  ): Promise<NullableType<FileType>> {
    const entity = await this.fileRepository.findOne({
      where: fields as FindOptionsWhere<FileEntity>,
    });

    return entity ? FileMapper.toDomain(entity) : null;
  }

  async softDeleteAndRemoveStorage(id: string): Promise<void> {
    const file = await this.fileRepository.findOne({
      where: { id },
    });

    if (!file) {
      throw new Error('File not found');
    }

    // Soft delete the file record
    await this.fileRepository.delete(id);

    // Delete the files from storage
    await this.deleteFileFromStorage(file.originalPath!);
    await this.deleteFileFromStorage(file.smallPath!);
    await this.deleteFileFromStorage(file.mediumPath!);
    await this.deleteFileFromStorage(file.largePath!);
  }

  private async deleteFileFromStorage(fileUrl: string): Promise<void> {
    const filename = fileUrl.split('/').pop();
    if (!filename) {
      throw new Error('Filename could not be extracted from the URL');
    }

    // Correctly construct the path to the file
    // This assumes that the `files` directory is at the root of your project
    // Adjust the '../' parts as necessary based on your project structure
    const projectRoot = path.resolve(
      __dirname.replace('/dist', ''),
      '../../../../',
    );
    const filePath = path.join(projectRoot, filename);

    try {
      await unlinkAsync(filePath);
      console.log(`File at ${filePath} was deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting file at ${filePath}:`, error);
      // Consider more specific error handling here based on the error code
      throw new Error('Failed to delete file from storage');
    }
  }

  async findManyWithPagination({
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterFilesDto | null;
    sortOptions?: SortFilesDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<InfinityPaginationResultType<FileType>> {
    const where: FindOptionsWhere<FileEntity> = {};

    // Count total records
    const totalRecords = await this.fileRepository.count({ where });
    paginationOptions.totalRecords = totalRecords;
    const entities = await this.fileRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      order: {
        createdAt: 'DESC',
      },
    });

    const records = entities.map((file) => FileMapper.toDomain(file));

    return {
      data: records,
      currentPage: paginationOptions.page,
      totalRecords: totalRecords,
      hasNextPage: records.length === paginationOptions.limit,
    };
  }
}
