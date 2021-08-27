import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { parseISO } from 'date-fns';

import ListUserDayTasksService from '@modules/tasks/services/ListUserDayTasksService';

class UserTasksDayController {
  async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const date = request.query.date as string;

    const listUserDayTasksService = container.resolve(ListUserDayTasksService);

    const tasks = await listUserDayTasksService.execute({
      date: parseISO(date),
      user_id,
    });

    return response.status(200).json(tasks);
  }
}

export default UserTasksDayController;
