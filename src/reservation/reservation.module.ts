import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { ReservationPersistenceModule } from './infrastructure/reservation-persistence.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [ReservationPersistenceModule, MailModule],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
