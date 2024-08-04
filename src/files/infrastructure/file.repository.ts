import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { FileType } from '../domain/file';
import { NullableType } from 'src/utils/types/nullable.type';
import { FilterFilesDto, SortFilesDto } from 'src/files/dto/query-file.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { InfinityPaginationResultType } from 'src/utils/types/infinity-pagination-result.type';

export abstract class FileRepository {
  abstract create(data: Omit<FileType, 'id'>): Promise<FileType>;

  abstract findOne(
    fields: EntityCondition<FileType>,
  ): Promise<NullableType<FileType>>;

  abstract softDeleteAndRemoveStorage(id: string): Promise<void>;

  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterFilesDto | null;
    sortOptions?: SortFilesDto[] | null;
    paginationOptions?: IPaginationOptions;
  })

}
