import { CreateDiscountDto } from 'src/discount/dto/create-discount.dto';

export abstract class DiscountAbstractRepository {
  abstract delete(discountId: string);
  abstract findAll();
  abstract create(data: CreateDiscountDto);
}
