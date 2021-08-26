import { container } from 'tsyringe';
import { Response, Request } from 'express';

import CreateUserService from '../../services/CreateUserService';

class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      email,
      name,
      password,
    });

    return response.json(user);
  }
}

export default UsersController;
