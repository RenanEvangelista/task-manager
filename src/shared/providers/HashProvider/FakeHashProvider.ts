import IHashProvider from './IHashProvider';

class FakeHashProvider implements IHashProvider {
  async generate(payload: string): Promise<string> {
    return `${payload}12345`;
  }

  async compare(payload: string, hash: string): Promise<boolean> {
    return `${payload}12345` === hash;
  }
}

export default FakeHashProvider;
