import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { PermissionsHierarchyObj } from 'src/common/seed-objects/permission.seed-data';
import { PermissionEntity } from 'src/role-permission-management/permission/infrastructure/entites/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionSeedService {
  constructor(
    @InjectRepository(PermissionEntity)
    private repository: Repository<PermissionEntity>,
  ) {}

  async run() {
    for (const categoryKey of Object.keys(PermissionsHierarchyObj)) {
      const category = PermissionsHierarchyObj[categoryKey];
      const parentPermission = await this.findOrCreatePermission(
        category.PARENT,
      );
      // Check if children exist before iterating
      if (category.CHILDREN) {
        for (const childKey of Object.keys(category.CHILDREN)) {
          const child = category.CHILDREN[childKey];
          await this.findOrCreatePermission(child, parentPermission.id); // Pass parent ID to findOrCreatePermission
        }
      }
    }
  }

  // Function to find or create a permission
  async findOrCreatePermission(
    permissionData: any,
    parentId?: string | null | undefined,
  ): Promise<PermissionEntity> {
    const existingPermission = await this.repository.findOne({
      where: { code: permissionData.PERMISSION_NAME }, // Provide selection conditions
    } as any); // Casting to any to bypass TypeScript error
    if (existingPermission) {
      existingPermission.description = permissionData.DESCRIPTION;
      existingPermission.updatedAt = new Date();
      return await this.repository.save(existingPermission);
    } else {
      const permission = new PermissionEntity();
      permission.id = randomUUID(); // Generate UUID for ID
      permission.code = permissionData.PERMISSION_NAME;
      permission.description = permissionData.DESCRIPTION;
      permission.createdAt = new Date();
      permission.updatedAt = new Date();
      permission.parentId = parentId || null; // Set parent ID
      return await this.repository.save(permission);
    }
  }
}
