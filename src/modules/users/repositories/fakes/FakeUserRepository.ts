import ICreateUserDTO from 'modules/users/dtos/ICreateUserDTO';
import User from 'modules/users/models/user';
import { uuid } from 'uuidv4';
import IUsersRepository from '../IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async create({ email, password, name }: ICreateUserDTO): Promise<User> {
    const user: User = {
      id: uuid(),
      name,
      email,
      password,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.users.push(user);
    return user;
  }

  async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(
      (userIndex) => userIndex.id === user.id,
    );

    this.users[findIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
