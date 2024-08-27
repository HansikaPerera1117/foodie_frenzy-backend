import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: {
            create: jest.fn().mockImplementation((data: CreateOrderDto) => {
              return { id: 1, ...data }; // Mock implementation of the create method
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an order', async () => {
      const dto: CreateOrderDto = {
        productIds: [],
        discountAmount: 0,
        netTotal: 0,
        subTotal: 0,
        paymentType: undefined,
        shippingFee: 0
      };

      const result = await controller.create(dto);

      expect(service.create).toHaveBeenCalledWith(dto); // Check that the service's create method was called with the correct data
      expect(result).toEqual({ id: 1, ...dto }); // Check that the result matches the mock implementation
    });
  });
});
