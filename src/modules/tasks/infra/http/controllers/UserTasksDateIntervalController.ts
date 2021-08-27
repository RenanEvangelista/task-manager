import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListUserTasksDateInterval from '@modules/tasks/services/ListUserTasksDateInterval';
import { parseISO } from 'date-fns';

class UserTasksDateIntervalController {
  async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { start_date, end_date } = request.query;

    const startDateParsed = parseISO(start_date as string);
    const endDateParsed = parseISO(end_date as string);

    const listUserTasksDateInterval = container.resolve(
      ListUserTasksDateInterval,
    );

    const tasks = await listUserTasksDateInterval.execute({
      user_id,
      start_date: startDateParsed,
      end_date: endDateParsed,
    });

    return response.status(200).json(tasks);
  }
}

export default UserTasksDateIntervalController;
