import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import DepartmentsController from '../controllers/DepartmentsController';

const departmentsRouter = Router();
const departmentsController = new DepartmentsController();

departmentsRouter.use(ensureAuthenticated);

departmentsRouter.post('/', departmentsController.create);

export default departmentsRouter;
