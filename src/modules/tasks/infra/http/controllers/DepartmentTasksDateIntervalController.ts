import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListDepartmentTasksDateIntervalService from '@modules/tasks/services/ListDepartmentTasksDateIntervalService';
import { parseISO } from 'date-fns';

class DepartmentTasksDateIntervalController {
  async index(request: Request, response: Response): Promise<Response> {
    const { department_id } = request.params;
    const { start_date, end_date } = request.query;

    const listDepartmentTasksDateInterval = container.resolve(
      ListDepartmentTasksDateIntervalService,
    );

    const startDateParsed = parseISO(start_date as string);
    const endDateParsed = parseISO(end_date as string);

    const tasks = await listDepartmentTasksDateInterval.execute({
      department_id: department_id as string,
      start_date: startDateParsed,
      end_date: endDateParsed,
    });

    return response.status(200).json(tasks);
  }
}

export default DepartmentTasksDateIntervalController;
