import { container } from 'tsyringe';

import IHashProvider from './HashProvider/IHashProvider';
import FakeHashProvider from './HashProvider/FakeHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', FakeHashProvider);
