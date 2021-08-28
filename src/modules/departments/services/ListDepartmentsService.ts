import { inject, injectable } from 'tsyringe';
import Department from '../model/Department';
import IDepartmentsRepository from '../repositories/IDepartmentsRepository';

@injectable()
class ListDepartmentsService {
  constructor(
    @inject('DepartmentsRepository')
    private readonly departmentsRepository: IDepartmentsRepository,
  ) {}

  async execute(): Promise<Department[]> {
    const departments = await this.departmentsRepository.find();

    return departments;
  }
}

export default ListDepartmentsService;
