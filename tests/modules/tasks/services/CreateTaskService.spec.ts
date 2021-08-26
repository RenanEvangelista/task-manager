import CreateTaskService from '@modules/tasks/services/CreateTaskService';
import FakeTasksRepository from '@modules/tasks/repositories/fakes/FakeTasksRepository';

let createTaskService: CreateTaskService;
let fakeTasksRepository: FakeTasksRepository;

describe('CreateTaskService', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository();
    createTaskService = new CreateTaskService(fakeTasksRepository);
  });

  it('should be able to create a task', async () => {
    const task = await createTaskService.execute({
      name: 'Test task',
      date: new Date(2021, 5, 25, 50, 35, 24),
      user_id: 'user_id',
      description: 'description',
    });

    expect(task).toHaveProperty('id');
  });
});
