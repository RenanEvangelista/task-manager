import TaskStatus from '@modules/tasks/models/TaskStatus';
import ITaskStatusRepository from '../ITaskStatusRepository';

class FakeTaskStatusRepository implements ITaskStatusRepository {
  private statusStorage: TaskStatus[] = [];

  async findById(id: string): Promise<TaskStatus | undefined> {
    throw new Error('Method not implemented.');
  }

  async create(name: string): Promise<TaskStatus> {
    throw new Error('Method not implemented.');
  }
}
