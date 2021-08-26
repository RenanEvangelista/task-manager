import User from '@modules/users/models/user';
import ICreateTaskDTO from '../dtos/ICreateTaskDTO';
import Task from '../models/task';

export default interface ITasksRepository {
  findById(id: number): Promise<Task | undefined>;
  findByUserByDay(user: User, day: number): Promise<Task[] | []>;
  create(data: ICreateTaskDTO): Promise<Task>;
}
