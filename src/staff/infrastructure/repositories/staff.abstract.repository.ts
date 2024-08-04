import { StaffFiltersDto } from 'src/staff/dto/staff-filters.dto';

export abstract class StaffAbstractRepository {
  abstract findAll(filters: StaffFiltersDto);

  // abstract create(data);

  abstract findOne(staffId: string);

  // abstract changeStatus();

  abstract update(staffId: string, data: any);
}
