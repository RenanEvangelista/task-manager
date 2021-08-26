import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IHashProvider from '@shared/providers/HashProvider/IHashProvider';
import User from '../models/user';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,

    @inject('HashProvider')
    private readonly hashProvider: IHashProvider,
  ) {}

  async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserDuplicateEmail = await this.usersRepository.findByEmail(
      email,
    );

    if (checkUserDuplicateEmail) {
      throw new AppError('Email address already used.');
    }

    const passwordEncrypted = await this.hashProvider.generate(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordEncrypted,
    });

    return user;
  }
}

export default CreateUserService;
