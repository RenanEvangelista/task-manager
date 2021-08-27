import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import TasksController from '../controllers/TasksController';
import UserTasksDayController from '../controllers/UserTasksDayController';
import UserTasksMonthController from '../controllers/UserTasksMonthController';
import UserTasksDateIntervalController from '../controllers/UserTasksDateIntervalController';

const tasksRouter = Router();
const tasksController = new TasksController();
const userTasksDayController = new UserTasksDayController();
const userTasksMonthController = new UserTasksMonthController();
const userTasksDateIntervalController = new UserTasksDateIntervalController();

tasksRouter.use(ensureAuthenticated);

tasksRouter.post('/', tasksController.create);
tasksRouter.get('/', userTasksDateIntervalController.index);
tasksRouter.get('/day', userTasksDayController.index);
tasksRouter.get('/month', userTasksMonthController.index);

export default tasksRouter;
