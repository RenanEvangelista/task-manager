import User from '@modules/users/models/user';
import Department from '../model/Department';

import ICreateDepartmentDTO from '../dtos/ICreateDepartmentDTO';

interface IDepartmentsRepository {
  find(): Promise<Department[]>;
  findById(id: string): Promise<Department | undefined>;
  create(data: ICreateDepartmentDTO): Promise<Department>;
  addUser(department: Department, user: User): Promise<Department>;
}

export default IDepartmentsRepository;
