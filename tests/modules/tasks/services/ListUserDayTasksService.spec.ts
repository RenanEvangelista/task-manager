import ListUserDayTasksService from '@modules/tasks/services/ListUserDayTasksService';
import FakeTasksRepository from '@modules/tasks/repositories/fakes/FakeTasksRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';

let listUserDayTasksService: ListUserDayTasksService;
let fakeTasksRepository: FakeTasksRepository;
let fakeUsersRepository: FakeUsersRepository;

describe('ListUserDayTasksService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeTasksRepository = new FakeTasksRepository();
    listUserDayTasksService = new ListUserDayTasksService(fakeTasksRepository);
  });

  it("should be able to list a day's user tasks", async () => {
    const date = new Date(2021, 5, 3, 20, 15, 36);

    const user = await fakeUsersRepository.create({
      email: 'test@test.com',
      name: 'Test user',
      password: '12345Rr*',
    });

    const task = await fakeTasksRepository.create({
      date,
      name: 'Task test',
      user_id: user.id,
    });

    const list = await listUserDayTasksService.execute({
      date,
      user_id: user.id,
    });

    expect(list).toEqual([task]);
  });

  it('should not be able to list tasks from another day', async () => {
    const date = new Date(2021, 5, 3, 20, 15, 36);
    const date2 = new Date(2021, 5, 4, 12, 15, 36);

    const user = await fakeUsersRepository.create({
      email: 'test@test.com',
      name: 'Test user',
      password: '12345Rr*',
    });

    await fakeTasksRepository.create({
      date: date2,
      name: 'Task test',
      user_id: user.id,
    });

    const task = await fakeTasksRepository.create({
      date,
      name: 'Task test',
      user_id: user.id,
    });

    const list = await listUserDayTasksService.execute({
      date,
      user_id: user.id,
    });

    expect(list).toEqual([task]);
  });
});
