import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import TasksController from '../controllers/TasksController';
import UserTasksDayController from '../controllers/UserTasksDayController';
import UserTasksMonthController from '../controllers/UserTasksMonthController';

const tasksRouter = Router();
const tasksController = new TasksController();
const userTasksDayController = new UserTasksDayController();
const userTasksMonthController = new UserTasksMonthController();

tasksRouter.use(ensureAuthenticated);

tasksRouter.post('/', tasksController.create);
tasksRouter.get('/day', userTasksDayController.index);
tasksRouter.get('/month', userTasksMonthController.index);

export default tasksRouter;
