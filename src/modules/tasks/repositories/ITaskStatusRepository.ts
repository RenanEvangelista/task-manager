import TaskStatus from '../models/TaskStatus';

interface ITaskStatusRepository {
  findById(id: string): Promise<TaskStatus | undefined>;
  create(name: string): Promise<TaskStatus>;
}

export default ITaskStatusRepository;
