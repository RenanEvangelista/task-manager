import { hash as encrypt, compare } from 'bcrypt';
import IHashProvider from '../IHashProvider';

class BcryptHashProvider implements IHashProvider {
  async generate(payload: string): Promise<string> {
    const hashed = await encrypt(payload, 8);

    return hashed;
  }

  async compare(payload: string, hash: string): Promise<boolean> {
    const compareResult = await compare(payload, hash);

    return compareResult;
  }
}

export default BcryptHashProvider;
