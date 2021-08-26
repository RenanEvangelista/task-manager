import User from '@modules/users/models/user';
import Task from '../models/task';

export default interface ITasksRepository {
  findById: (id: number) => Promise<Task | undefined>;
  findByUserByDate: (user: User, date: Date) => Promise<Task[] | []>;
}
