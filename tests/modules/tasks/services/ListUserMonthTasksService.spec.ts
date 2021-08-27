import ListUserMonthTasksService from '@modules/tasks/services/ListUserMonthTasksServices';
import FakeTasksRepository from '@modules/tasks/repositories/fakes/FakeTasksRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';

let listUserMonthTasksService: ListUserMonthTasksService;
let fakeTasksRepository: FakeTasksRepository;
let fakeUsersRepository: FakeUsersRepository;

describe('ListUserMonthTasksService', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository();
    fakeUsersRepository = new FakeUsersRepository();

    listUserMonthTasksService = new ListUserMonthTasksService(
      fakeTasksRepository,
    );
  });

  it("should be able to list a month's user tasks", async () => {
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

    const list = await listUserMonthTasksService.execute({
      date,
      user_id: user.id,
    });

    expect(list).toEqual([task]);
  });
});
