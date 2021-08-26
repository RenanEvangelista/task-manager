import ICreateTaskDTO from '@modules/tasks/dtos/ICreateTaskDTO';
import Task from '@modules/tasks/models/Task';
import { startOfDay, differenceInDays } from 'date-fns';
import { uuid } from 'uuidv4';
import ITasksRepository from '../ITasksRepository';

class FakeTasksRepository implements ITasksRepository {
  private tasks: Task[] = [];

  async findById(id: string): Promise<Task | undefined> {
    const task = this.tasks.find((taskFind) => taskFind.id === id);

    return task;
  }

  async findByUserByDay(user_id: string, date: Date): Promise<Task[] | []> {
    const tasks = this.tasks.filter(
      (task) => user_id === task.user_id && !differenceInDays(date, task.date),
    );

    return tasks;
  }

  async create({
    name,
    date,
    user_id,
    description,
  }: ICreateTaskDTO): Promise<Task> {
    const task: Task = {
      id: uuid(),
      name,
      user_id,
      date: startOfDay(date),
      description,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.tasks.push(task);

    return task;
  }
}

export default FakeTasksRepository;
