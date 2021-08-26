import { getRepository, Repository } from 'typeorm';
import User from '@modules/users/models/user';
import UserEntity from '@shared/infra/database/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '../IUsersRepository';

class TypeOrmUserRepository implements IUsersRepository {
  private readonly userRepository: Repository<UserEntity>;

  constructor() {
    this.userRepository = getRepository(UserEntity);
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne(id);

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.userRepository.create(userData);

    await this.userRepository.save(user);

    return user;
  }

  async save(user: User): Promise<User> {
    await this.userRepository.save(user);

    return user;
  }
}

export default TypeOrmUserRepository;
