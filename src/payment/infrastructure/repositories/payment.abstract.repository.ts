import { PaymentFiltersDto } from 'src/payment/dto/payment-filters.dto';

export abstract class PaymentAbstractRepository {
  abstract findAll(filters: PaymentFiltersDto);
}
