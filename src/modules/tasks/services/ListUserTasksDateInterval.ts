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

  async execute(data: IRequest): Promise<Task[]> {
    const tasks = await this.tasksRepository.findByUserByDateInterval(data);

    return tasks;
  }
}

export default ListUserTasksDateInterval;
