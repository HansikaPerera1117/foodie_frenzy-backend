import { IsArray, IsString } from 'class-validator';

export class RolePermissionDto {
  @IsString()
  roleId: string;
  @IsArray()
  @IsString({ each: true })
  permissionIds: [];
}
