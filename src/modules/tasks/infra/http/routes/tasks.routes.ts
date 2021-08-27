import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import TasksController from '../controllers/TasksController';
import UserTasksDayController from '../controllers/UserTasksDayController';

const tasksRouter = Router();
const tasksController = new TasksController();
const userTasksDayController = new UserTasksDayController();

tasksRouter.use(ensureAuthenticated);

tasksRouter.post('/', tasksController.create);
tasksRouter.get('/', userTasksDayController.index);

export default tasksRouter;
