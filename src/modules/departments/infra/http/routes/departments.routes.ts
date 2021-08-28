import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import DepartmentsController from '../controllers/DepartmentsController';
import DepartmentUsersController from '../controllers/DepartmentUsersController';

const departmentsRouter = Router();
const departmentsController = new DepartmentsController();
const departmentUsersController = new DepartmentUsersController();

departmentsRouter.use(ensureAuthenticated);

departmentsRouter.post('/', departmentsController.create);
departmentsRouter.post('/users', departmentUsersController.update);

export default departmentsRouter;
