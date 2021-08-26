import { startOfDay } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import ITasksRepository from '../repositories/ITasksRepository';

import Task from '../models/task';

interface IRequest {
  user_id: string;
  date: Date;
}

@injectable()
class ListUserDayTasksService {
  constructor(
    @inject('TasksRepository')
    private readonly tasksRepository: ITasksRepository,
  ) {}

  async execute({ user_id, date }: IRequest): Promise<Task[] | []> {
    const startDate = startOfDay(date);

    const list = await this.tasksRepository.findByUserByDay(user_id, startDate);
    return list;
  }
}

export default ListUserDayTasksService;
