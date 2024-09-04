import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { ReservationService } from './reservation.service';
import { ReservationEntity } from './infrastructure/entites/reservation.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ReservationService', () => {
  let service: ReservationService;
  let repository: Repository<ReservationEntity>;

  // Mock data
  const dummyReservation: Object = {
    id: '123',
    status: 'PENDING',
    callBackResponse: null,
    reservationCode: 'RES-123',
    email: 'invalidEmail',
    personCount: 2,
    contactNo: '1234567890',
    date: new Date(),
    time: '18:00',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        {
          provide: getRepositoryToken(ReservationEntity),
          useValue: {
            create: jest.fn().mockReturnValue(dummyReservation),
            save: jest.fn().mockResolvedValue(dummyReservation),
            find: jest.fn().mockResolvedValue([dummyReservation]),
            findOneBy: jest.fn().mockResolvedValue(dummyReservation),
            update: jest.fn().mockResolvedValue(undefined),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
    repository = module.get<Repository<ReservationEntity>>(
      getRepositoryToken(ReservationEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a reservation', async () => {
      const createDto: any = {
        email: 'test@example.com',
        personCount: 2,
        contactNo: '1234567890',
        date: new Date(),
        time: '18:00',
      };
      expect(await service.create(createDto)).toEqual(dummyReservation);
    });
  });

  describe('findAll', () => {
    it('should return an array of reservations', async () => {
      expect(await service.findAll()).toEqual([dummyReservation]);
    });
  });

  describe('findOne', () => {
    it('should return a single reservation by ID', async () => {
      expect(await service.findOne('dummy-id')).toEqual(dummyReservation);
    });
  });

  describe('update', () => {
    it('should update and return the reservation', async () => {
      const updateData = { email: 'updated@example.com' };
      const updatedReservation = { ...dummyReservation, ...updateData };
      jest
        .spyOn(repository, 'findOneBy')
        .mockResolvedValue(updatedReservation as any);
      expect(await service.update('dummy-id', updateData)).toEqual(
        updatedReservation,
      );
    });
  });

  describe('delete', () => {
    it('should delete a reservation by ID', async () => {
      await expect(service.delete('dummy-id')).resolves.not.toThrow();
    });
  });
});
