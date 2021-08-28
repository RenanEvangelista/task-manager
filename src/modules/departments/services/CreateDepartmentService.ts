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
  ) {}

  async execute({ name, owner_id }: IRequest): Promise<Department> {
    const department = await this.departmentsRepository.create({
      name,
      owner_id,
    });

    return department;
  }
}

export default CreateDepartmentService;
