import ICreateTaskDTO from '@modules/tasks/dtos/ICreateTaskDTO';
import IFindByDepartmentByDateIntervalDTO from '@modules/tasks/dtos/IFindByDepartmentByDateIntervalDTO';
import IFindByUserByDateIntervalDTO from '@modules/tasks/dtos/IFindByUserByDateIntervalDTO';
import Task from '@modules/tasks/models/Task';
import {
  startOfMinute,
  differenceInCalendarDays,
  differenceInMonths,
  isAfter,
  isBefore,
} from 'date-fns';
import { v4 } from 'uuid';
import ITasksRepository from '../ITasksRepository';

class FakeTasksRepository implements ITasksRepository {
  private tasks: Task[] = [];

  async findById(id: string): Promise<Task | undefined> {
    const task = this.tasks.find((taskFind) => taskFind.id === id);

    return task;
  }

  async findByUserByDay(user_id: string, date: Date): Promise<Task[]> {
    const tasks = this.tasks.filter((task) => {
      return (
        user_id === task.user_id && !differenceInCalendarDays(date, task.date)
      );
    });

    return tasks;
  }

  async findByUserByMonth(user_id: string, date: Date): Promise<Task[]> {
    const tasks = this.tasks.filter(
      (task) =>
        user_id === task.user_id && !differenceInMonths(date, task.date),
    );

    return tasks;
  }

  async findByUserByDateInterval({
    user_id,
    start_date,
    end_date,
  }: IFindByUserByDateIntervalDTO): Promise<Task[]> {
    const tasks = this.tasks.filter(
      (task) =>
        user_id === task.user_id &&
        isAfter(task.date, start_date) &&
        isBefore(task.date, end_date),
    );

    return tasks;
  }

  async findByDepartmentByDateInterval({
    department_id,
    start_date,
    end_date,
  }: IFindByDepartmentByDateIntervalDTO): Promise<Task[]> {
    const tasks = this.tasks.filter(
      (task) =>
        department_id === task.department_id &&
        isAfter(task.date, start_date) &&
        isBefore(task.date, end_date),
    );

    return tasks;
  }

  async create({
    name,
    date,
    user_id,
    department_id,
    description,
    status = 'pending',
  }: ICreateTaskDTO): Promise<Task> {
    const task: Task = {
      id: v4(),
      name,
      user_id,
      department_id,
      date: startOfMinute(date),
      description,
      status,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.tasks.push(task);

    return task;
  }
}

export default FakeTasksRepository;
