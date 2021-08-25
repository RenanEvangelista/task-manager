import User from '../models/user';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

interface IUsersRepository {
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}

export default IUsersRepository;
