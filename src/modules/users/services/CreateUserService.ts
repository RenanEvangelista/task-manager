import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

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
    @inject('usersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserDuplicateEmail = await this.usersRepository.findByEmail(
      email,
    );

    if (checkUserDuplicateEmail) {
      throw new AppError('Email address already used.');
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password,
    });

    return user;
  }
}

export default CreateUserService;
