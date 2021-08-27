import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListUserMonthTasksService from '@modules/tasks/services/ListUserMonthTasksServices';
import { parseISO } from 'date-fns';

class UserTasksMonthController {
  async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const date = request.query.date as string;

    const dateParsed = parseISO(date);

    const listUserMonthTasksService = container.resolve(
      ListUserMonthTasksService,
    );

    const tasks = await listUserMonthTasksService.execute({
      date: dateParsed,
      user_id,
    });

    return response.status(200).json(tasks);
  }
}

export default UserTasksMonthController;
