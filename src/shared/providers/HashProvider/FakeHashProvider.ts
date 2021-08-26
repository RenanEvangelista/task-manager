import crypto from 'crypto';

import IHashProvider from './IHashProvider';

class FakeHashProvider implements IHashProvider {
  async generate(payload: string): Promise<string> {
    return crypto.createHash('md5').update(payload).digest('hex');
  }

  async compare(payload: string, hash: string): Promise<boolean> {
    return payload === hash;
  }
}

export default FakeHashProvider;
