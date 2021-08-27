import TaskStatus from '@modules/tasks/models/TaskStatus';
import { v4 } from 'uuid';
import ITaskStatusRepository from '../ITaskStatusRepository';

class FakeTaskStatusRepository implements ITaskStatusRepository {
  private statusStorage: TaskStatus[] = [];

  async findAll(): Promise<TaskStatus[]> {
    return this.statusStorage;
  }

  async findById(id: string): Promise<TaskStatus | undefined> {
    const status = this.statusStorage.find((st) => st.id === id);

    return status;
  }

  async create(title: string): Promise<TaskStatus> {
    const status = {
      id: v4(),
      title,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.statusStorage.push(status);

    return status;
  }
}

export default FakeTaskStatusRepository;
