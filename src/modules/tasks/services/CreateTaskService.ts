import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ITasksRepository from '../repositories/ITasksRepository';
import Task from '../models/Task';

interface IRequest {
  user_id: string;
  date: Date;
  name: string;
  status?: string;
  description?: string;
}

@injectable()
class CreateTaskService {
  constructor(
    @inject('TasksRepository')
    private readonly tasksRepository: ITasksRepository,

    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute({
    user_id,
    date,
    name,
    description,
    status = 'pending',
  }: IRequest): Promise<Task> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('user not found');
    }

    const task = await this.tasksRepository.create({
      user_id,
      name,
      date,
      description,
      status,
    });

    return task;
  }
}

export default CreateTaskService;
