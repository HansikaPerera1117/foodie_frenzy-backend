import { Expose } from 'class-transformer';
import { StatusEnum } from 'src/common/enum/status.enum';


export class Role {
  id: string;
  @Expose()
  name?: string;
  status?: StatusEnum;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
