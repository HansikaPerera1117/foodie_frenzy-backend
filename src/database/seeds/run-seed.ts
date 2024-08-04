import { NestFactory } from '@nestjs/core';
import { RoleSeedService } from './role/role-seed.service';
import { SeedModule } from './seed.module';
import { UserSeedService } from './user/user-seed.service';
import { PermissionSeedService } from './permission/permission-seed.service';
import { CategorySeedService } from './category/category-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  // run
  await app.get(RoleSeedService).run();
  await app.get(PermissionSeedService).run();
  await app.get(UserSeedService).run();
  await app.get(CategorySeedService).run();

  await app.close();
};

void runSeed();
