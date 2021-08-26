import User from '@modules/users/models/user';
import ICreateTaskDTO from '../dtos/ICreateTaskDTO';
import Task from '../models/task';

export default interface ITasksRepository {
  findById(id: string): Promise<Task | undefined>;
  findByUserByDay(user: User, date: Date): Promise<Task[] | []>;
  create(data: ICreateTaskDTO): Promise<Task>;
}
