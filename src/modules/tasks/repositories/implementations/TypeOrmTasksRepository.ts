import { Repository, getRepository, Raw } from 'typeorm';
import ICreateTaskDTO from '@modules/tasks/dtos/ICreateTaskDTO';
import Task from '@modules/tasks/models/Task';
import TaskEntity from '@shared/infra/database/typeorm/entities/Task';
import { format } from 'date-fns';
import ITasksRepository from '../ITasksRepository';

class TypeOrmTasksRepository implements ITasksRepository {
  private readonly tasksRepository: Repository<TaskEntity>;

  constructor() {
    this.tasksRepository = getRepository(TaskEntity);
  }

  async findById(id: string): Promise<Task | undefined> {
    const task = await this.tasksRepository.findOne(id);

    return task;
  }

  async findByUserByDay(user_id: string, date: Date): Promise<Task[] | []> {
    const Formated = format(date, 'dd-MM-yyyy');

    const tasks = await this.tasksRepository.find({
      where: {
        user_id,
        date: Raw(
          (dateFiled) => `to_char(${dateFiled}, 'DD-MM-YYYY') = '${Formated}'`,
        ),
      },
    });

    return tasks;
  }

  async findByUserByMonth(user_id: string, date: Date): Promise<Task[] | []> {
    const Formated = format(date, 'MM-yyyy');

    const tasks = await this.tasksRepository.find({
      where: {
        user_id,
        date: Raw(
          (dateFiled) => `to_char(${dateFiled}, 'MM-YYYY') = '${Formated}'`,
        ),
      },
    });

    return tasks;
  }

  async create(taskData: ICreateTaskDTO): Promise<Task> {
    const task = this.tasksRepository.create(taskData);

    await this.tasksRepository.save(task);

    return task;
  }
}

export default TypeOrmTasksRepository;
