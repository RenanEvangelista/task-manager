import ICreateTaskDTO from '../dtos/ICreateTaskDTO';
import IFindByUserByDateIntervalDTO from '../dtos/IFindByUserByDateIntervalDTO';
import IFindByDepartmentByDateIntervalDTO from '../dtos/IFindByDepartmentByDateIntervalDTO';
import Task from '../models/Task';

export default interface ITasksRepository {
  findById(id: string): Promise<Task | undefined>;
  findByUserByDay(user_id: string, date: Date): Promise<Task[]>;
  findByUserByMonth(user_id: string, date: Date): Promise<Task[]>;
  findByUserByDateInterval(data: IFindByUserByDateIntervalDTO): Promise<Task[]>;
  findByDepartmentByDateInterval(
    data: IFindByDepartmentByDateIntervalDTO,
  ): Promise<Task[]>;
  create(data: ICreateTaskDTO): Promise<Task>;
}
