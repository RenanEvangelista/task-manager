import Department from '../model/Department';

import ICreateDepartmentDTO from '../dtos/ICreateDepartmentDTO';

interface IDepartmentsRepository {
  findById(id: string): Promise<Department | undefined>;
  create(data: ICreateDepartmentDTO): Promise<Department>;
}

export default IDepartmentsRepository;
