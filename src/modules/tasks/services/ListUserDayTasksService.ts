import { inject, injectable } from 'tsyringe';

import ITasksRepository from '../repositories/ITasksRepository';

import Task from '../models/Task';

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

  async execute({ user_id, date }: IRequest): Promise<Task[]> {
    const list = await this.tasksRepository.findByUserByDay(user_id, date);
    return list;
  }
}

export default ListUserDayTasksService;
