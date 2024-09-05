import { Injectable } from '@nestjs/common';
import { OrderItemAbstractRepository } from './order-item.abstract.repository';

@Injectable()
export class OrderItemRepository implements OrderItemAbstractRepository {}
