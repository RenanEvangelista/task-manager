import ICreateDepartmentDTO from '@modules/departments/dtos/ICreateDepartmentDTO';
import Department from '@modules/departments/model/Department';
import User from '@modules/users/models/user';
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
      users: [],
    };

    return department;
  }

  async addUser(department: Department, user: User): Promise<Department> {
    const newDepartment = department;
    newDepartment.users = [...department.users, user];

    const departmentIndex = this.departments.findIndex(
      (departmentFind) => departmentFind.id === department.id,
    );

    this.departments[departmentIndex] = newDepartment;

    return newDepartment;
  }
}

export default FakeDepartmentsRepository;
