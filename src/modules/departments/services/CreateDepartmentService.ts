import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import Department from '../model/Department';
import IDepartmentsRepository from '../repositories/IDepartmentsRepository';

interface IRequest {
  name: string;
  owner_id: string;
}

@injectable()
class CreateDepartmentService {
  constructor(
    @inject('DepartmentsRepository')
    private readonly departmentsRepository: IDepartmentsRepository,
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute({ name, owner_id }: IRequest): Promise<Department> {
    const owner = await this.usersRepository.findById(owner_id);

    if (!owner) {
      throw new AppError('owner not found');
    }

    const department = await this.departmentsRepository.create({
      name,
      owner_id,
    });

    return department;
  }
}

export default CreateDepartmentService;
