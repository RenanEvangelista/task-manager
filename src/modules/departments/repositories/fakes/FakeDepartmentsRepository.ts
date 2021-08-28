import ICreateDepartmentDTO from '@modules/departments/dtos/ICreateDepartmentDTO';
import Department from '@modules/departments/model/Department';
import { v4 } from 'uuid';
import IDepartmentsRepository from '../IDepartmentsRepository';

class FakeDepartmentsRepository implements IDepartmentsRepository {
  private departments: Department[] = [];

  async findById(id: string): Promise<Department | undefined> {
    const department = this.departments.find(
      (departmentFind) => departmentFind.id === id,
    );

    return department;
  }

  async create({ name, owner_id }: ICreateDepartmentDTO): Promise<Department> {
    const department = {
      id: v4(),
      created_at: new Date(),
      updated_at: new Date(),
      name,
      owner_id,
    };

    return department;
  }
}

export default FakeDepartmentsRepository;
