import IDepartmentsRepository from '@modules/departments/repositories/IDepartmentsRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import Task from '../models/Task';
import ITasksRepository from '../repositories/ITasksRepository';

interface IRequest {
  department_id: string;
  start_date: Date;
  end_date: Date;
}

@injectable()
class ListDepartmentTasksDateIntervalService {
  constructor(
    @inject('TasksRepository')
    private readonly tasksRepository: ITasksRepository,

    @inject('DepartmentsRepository')
    private readonly departmentsRepository: IDepartmentsRepository,
  ) {}

  async execute({
    department_id,
    start_date,
    end_date,
  }: IRequest): Promise<Task[]> {
    const department = await this.departmentsRepository.findById(department_id);

    if (!department) {
      throw new AppError('department not found');
    }

    const tasks = await this.tasksRepository.findByDepartmentByDateInterval({
      department_id,
      start_date,
      end_date,
    });

    return tasks;
  }
}

export default ListDepartmentTasksDateIntervalService;
