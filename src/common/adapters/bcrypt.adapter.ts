import * as bcrypt from 'bcrypt';

export class BcryptAdapterImpl {
  static hashSync(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  static compareSync(password: string, encryptedPassword: string): string {
    console.log('<--------------- JK Bcrypt.adapter --------------->');
    console.log(password, encryptedPassword);
    return bcrypt.compareSync(password, encryptedPassword);
  }
}
