import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateDepartmentService from '@modules/departments/services/CreateDepartmentService';
import ListDepartmentsService from '@modules/departments/services/ListDepartmentsService';

class DepartmentsController {
  async index(_request: Request, response: Response): Promise<Response> {
    const listDepartmentsService = container.resolve(ListDepartmentsService);

    const departments = await listDepartmentsService.execute();

    return response.status(200).json(departments);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const owner_id = request.user.id;

    const { name } = request.body;

    const createDepartmentService = container.resolve(CreateDepartmentService);

    const department = await createDepartmentService.execute({
      name,
      owner_id,
    });

    return response.status(201).json(department);
  }
}

export default DepartmentsController;
