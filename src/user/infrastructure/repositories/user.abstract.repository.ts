
export abstract class UserAbstractRepository {
  
  abstract findById(userId: string);



  abstract findByEmail(email: string);

  abstract findByEmailAndPasswd(email: string, password: string);
}
