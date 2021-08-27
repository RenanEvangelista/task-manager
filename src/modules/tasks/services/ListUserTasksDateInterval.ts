import { inject, injectable } from 'tsyringe';

import Task from '../models/Task';
import ITasksRepository from '../repositories/ITasksRepository';

interface IRequest {
  user_id: string;
  start_date: Date;
  end_date: Date;
}

@injectable()
class ListUserTasksDateInterval {
  constructor(
    @inject('TasksRepository')
    private readonly tasksRepository: ITasksRepository,
  ) {}

  async execute({ user_id, start_date, end_date }: IRequest): Promise<Task[]> {
    const tasks = await this.tasksRepository.findByUserByDateInterval({
      user_id,
      start_date,
      end_date,
    });

    return tasks;
  }
}

export default ListUserTasksDateInterval;
