export abstract class ServiceAbstractRepository {
  abstract delete(serviceId: string);

  abstract create(data: any);
  abstract findAll();
}
