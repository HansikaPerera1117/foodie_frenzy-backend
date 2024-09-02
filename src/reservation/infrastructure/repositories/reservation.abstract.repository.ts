import { PaymentFiltersDto } from 'src/payment/dto/payment-filters.dto';
import { CreateReservationDto } from 'src/reservation/dto/create-reservation.dto';

export abstract class ReservationAbstractRepository {
  abstract findAll();
  abstract acceptOrReject(reservationId: string, status: any);

  abstract create(data: CreateReservationDto);
}
