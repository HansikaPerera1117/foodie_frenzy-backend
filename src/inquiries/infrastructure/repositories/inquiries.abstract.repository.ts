export abstract class InquiriesAbstractRepository {
  abstract findAll();

  abstract reply(inquirieId: string, message: string);

  abstract submit(data: any);
}
