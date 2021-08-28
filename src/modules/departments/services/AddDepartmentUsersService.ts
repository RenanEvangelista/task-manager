import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import Department from '../model/Department';
import IDepartmentsRepository from '../repositories/IDepartmentsRepository';

interface IRequest {
  department_id: string;
  user_id: string;
}

@injectable()
class AddDepartmentUsersService {
  constructor(
    @inject('DepartmentsRepository')
    private readonly departmentsRepository: IDepartmentsRepository,
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute({ department_id, user_id }: IRequest): Promise<Department> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('user not found');
    }

    const department = await this.departmentsRepository.findById(department_id);

    if (!department) {
      throw new AppError('department not found');
    }

    if (department.users.find((userFind) => userFind.id === user.id)) {
      throw new AppError('user already added');
    }

    const updatedDepartment = await this.departmentsRepository.addUser(
      department,
      user,
    );

    return updatedDepartment;
  }
}

export default AddDepartmentUsersService;
