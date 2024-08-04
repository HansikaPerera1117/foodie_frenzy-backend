export abstract class CustomerAbstractRepository {
  abstract resetPasswd(email: string, newPassword: string);

  abstract findAll();

  // abstract findOne();

  // abstract changeStatus();

  abstract update(data);

  // abstract findByEmail(email: string);

  abstract findByContactDetails(contactDetails);
}
