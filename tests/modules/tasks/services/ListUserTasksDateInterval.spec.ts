import FakeTasksRepository from '@modules/tasks/repositories/fakes/FakeTasksRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import ListUserTasksDateInterval from '@modules/tasks/services/ListUserTasksDateInterval';

let listUserTasksDateInterval: ListUserTasksDateInterval;
let fakeTasksRepository: FakeTasksRepository;
let fakeUsersRepository: FakeUsersRepository;

describe('ListUserMonthTasksService', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository();
    fakeUsersRepository = new FakeUsersRepository();

    listUserTasksDateInterval = new ListUserTasksDateInterval(
      fakeTasksRepository,
    );
  });

  it('should be able to list by user from custom date interval', async () => {
    const start_date = new Date(2021, 5, 1);
    const end_date = new Date(2021, 6, 5);
    const task_date = new Date(2021, 5, 5);

    const user = await fakeUsersRepository.create({
      email: 'test@test.com',
      name: 'Test user',
      password: '12345Rr*',
    });

    const task = await fakeTasksRepository.create({
      date: task_date,
      name: 'Task test',
      user_id: user.id,
    });

    const list = await listUserTasksDateInterval.execute({
      start_date,
      end_date,
      user_id: user.id,
    });

    expect(list).toEqual([task]);
  });
});
