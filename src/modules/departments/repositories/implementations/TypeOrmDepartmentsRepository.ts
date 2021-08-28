import ICreateDepartmentDTO from '@modules/departments/dtos/ICreateDepartmentDTO';
import Department from '@modules/departments/model/Department';
import { getRepository, Repository } from 'typeorm';
import DepartmentEntity from '@shared/infra/database/typeorm/entities/Department';
import IDepartmentsRepository from '../IDepartmentsRepository';

class TypeOrmDepartmentsRepository implements IDepartmentsRepository {
  private departmentsRepository: Repository<DepartmentEntity>;

  constructor() {
    this.departmentsRepository = getRepository(DepartmentEntity);
  }

  async findById(id: string): Promise<Department | undefined> {
    const department = await this.departmentsRepository.findOne(id);

    return department;
  }

  async create(data: ICreateDepartmentDTO): Promise<Department> {
    const department = this.departmentsRepository.create(data);

    await this.departmentsRepository.save(department);

    return department;
  }
}

export default TypeOrmDepartmentsRepository;
