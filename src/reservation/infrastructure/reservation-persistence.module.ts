import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationAbstractRepository } from './repositories/reservation.abstract.repository';
import { ReservationEntity } from './entites/reservation.entity';
import { ReservationRepository } from './repositories/reservation.repository';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationEntity]), MailModule],
  providers: [
    {
      provide: ReservationAbstractRepository,
      useClass: ReservationRepository,
    },
  ],
  exports: [ReservationAbstractRepository],
})
export class ReservationPersistenceModule {}
