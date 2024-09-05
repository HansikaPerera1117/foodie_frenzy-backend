import { Injectable } from '@nestjs/common';
import { ReservationAbstractRepository } from './reservation.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservationEntity } from '../entites/reservation.entity';
import { CreateReservationDto } from 'src/reservation/dto/create-reservation.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class ReservationRepository implements ReservationAbstractRepository {
  constructor(
    @InjectRepository(ReservationEntity)
    private readonly reservationRepository: Repository<ReservationEntity>,
    private readonly mailService: MailService,
  ) {}

  findAll() {
    return this.reservationRepository.find({
      relations: {
        user: true,
      },
    });
  }
  async acceptOrReject(reservationId: string, status: any) {
    const acceptOrReject = await this.reservationRepository.update(
      { id: reservationId },
      { status: status },
    );
    const reservation = await this.reservationRepository.findOne({
      where: {
        id: reservationId,
      },
      relations: {
        user: true,
      },
    });
    const emailData = {
      email: reservation?.user.email,
      date: reservation?.date,
      time: reservation?.time,
      personCount: reservation?.personCount,
      status: status,
      reservationCode: reservation?.reservationCode,
    };
    await this.mailService.sendReservationApproveOrReject(emailData);
    return acceptOrReject;
  }
  async create(data: CreateReservationDto) {
    return this.reservationRepository.save({
      email: data.getEmail(),
      contactNo: data.getContactNo(),
      time: data.getTime(),
      date: data.getDate(),
      personCount: data.getPersonCount(),
      payment: data.getPaymentId(),
      reservationCode: await this.createRandomCode(),
      user: {
        id: data?.userId,
      },
    });
  }

  createRandomCode(): string {
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < 7; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }
}
