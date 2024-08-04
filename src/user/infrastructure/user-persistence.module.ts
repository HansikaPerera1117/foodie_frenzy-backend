import { Module } from '@nestjs/common';
import { UserAbstractRepository } from './repositories/user.abstract.repository';
import { UserRepository } from './repositories/user.repository';
import { UserEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    {
      provide: UserAbstractRepository,
      useClass: UserRepository,
    },
  ],
  exports: [UserAbstractRepository],
})
export class UserPersistenceModule {}
