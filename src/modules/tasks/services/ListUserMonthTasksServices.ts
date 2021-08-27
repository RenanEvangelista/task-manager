import { inject, injectable } from 'tsyringe';

import Task from '../models/Task';
import ITasksRepository from '../repositories/ITasksRepository';

interface IRequest {
  user_id: string;
  date: Date;
}

@injectable()
class ListUserMonthTasksService {
  constructor(
    @inject('TasksRepository')
    private readonly tasksRepository: ITasksRepository,
  ) {}

  async execute({ user_id, date }: IRequest): Promise<Task[] | []> {
    const tasks = await this.tasksRepository.findByUserByMonth(user_id, date);

    return tasks;
  }
}

export default ListUserMonthTasksService;
