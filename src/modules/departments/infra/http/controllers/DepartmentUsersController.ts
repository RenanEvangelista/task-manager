import { container } from 'tsyringe';
import { Request, Response } from 'express';

import AddDepartmentUsersService from '@modules/departments/services/AddDepartmentUsersService';

class DepartmentUsersController {
  async update(request: Request, response: Response): Promise<Response> {
    const { department_id, user_id } = request.body;

    const addDepartmentUsersService = container.resolve(
      AddDepartmentUsersService,
    );

    const department = await addDepartmentUsersService.execute({
      department_id,
      user_id,
    });

    return response.status(201).json(department);
  }
}

export default DepartmentUsersController;
