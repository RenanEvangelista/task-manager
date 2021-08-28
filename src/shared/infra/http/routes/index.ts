import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import tasksRouter from '@modules/tasks/infra/http/routes/tasks.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import departmentsRouter from '@modules/departments/infra/http/routes/departments.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/tasks', tasksRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/departments', departmentsRouter);

export default routes;
