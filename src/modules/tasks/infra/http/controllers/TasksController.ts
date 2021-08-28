import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { parseISO, startOfMinute } from 'date-fns';

import CreateTaskService from '@modules/tasks/services/CreateTaskService';

class TasksController {
  async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { name, description, date, status } = request.body;

    const createTaskService = container.resolve(CreateTaskService);

    const dateParsed = startOfMinute(parseISO(date));

    const task = await createTaskService.execute({
      date: dateParsed,
      name,
      description,
      user_id,
      status,
    });

    return response.status(201).json(task);
  }
}

export default TasksController;
