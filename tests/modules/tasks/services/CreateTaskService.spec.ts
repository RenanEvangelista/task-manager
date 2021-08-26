import CreateTaskService from '@modules/tasks/services/CreateTaskService';
import FakeTasksRepository from '@modules/tasks/repositories/fakes/FakeTasksRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import AppError from '@shared/errors/AppError';

let createTaskService: CreateTaskService;
let fakeTasksRepository: FakeTasksRepository;
let fakeUsersRepository: FakeUsersRepository;

describe('CreateTaskService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeTasksRepository = new FakeTasksRepository();
    createTaskService = new CreateTaskService(
      fakeTasksRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to create a task', async () => {
    const user = await fakeUsersRepository.create({
      email: 'test@test.com',
      name: 'Test user',
      password: '12345Rr*',
    });

    const task = await createTaskService.execute({
      name: 'Test task',
      date: new Date(2021, 5, 25, 50, 35, 24),
      user_id: user.id,
      description: 'description',
    });

    expect(task).toHaveProperty('id');
  });

  it('should not be able to create task with a non-existing user', async () => {
    await expect(
      createTaskService.execute({
        name: 'Test task',
        date: new Date(2021, 5, 25, 50, 35, 24),
        user_id: 'user_id',
        description: 'description',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
