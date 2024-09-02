import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post('create')
  create(@Body() data: CreateReservationDto) {
    return this.reservationService.create(data);
  }
  @Patch('accept-or-reject/:reservationId')
  acceptOrReject(
    @Param('reservationId') reservationId: string,
    @Query('status') status: any,
  ) {
    return this.reservationService.acceptOrReject(reservationId, status);
  }

  @Get('find-all')
  findAll() {
    return this.reservationService.findAll();
  }
}
