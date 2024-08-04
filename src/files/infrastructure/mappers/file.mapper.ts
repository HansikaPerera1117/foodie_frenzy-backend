import { FileType } from '../../domain/file';
import { FileEntity } from '../entities/file.entity';

export class FileMapper {
  static toDomain(raw: FileEntity): FileType {
    const file = new FileType();
    file.id = raw.id;
    file.originalName = raw?.originalName;
    file.originalPath = raw.originalPath;
    file.smallPath = raw.smallPath;
    file.mediumPath = raw.mediumPath;
    file.largePath = raw.largePath;
    return file;
  }

  static toPersistence(file: FileType): FileEntity {
    const fileEntity = new FileEntity();
    fileEntity.id = file.id;
    fileEntity.originalName = file.originalName;
    fileEntity.originalPath = file.originalPath;
    fileEntity.smallPath = file.smallPath;
    fileEntity.mediumPath = file.mediumPath;
    fileEntity.largePath = file.largePath;
    return fileEntity;
  }
}
