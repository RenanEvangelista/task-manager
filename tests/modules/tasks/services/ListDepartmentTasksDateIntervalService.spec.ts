import FakeTasksRepository from '@modules/tasks/repositories/fakes/FakeTasksRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import ListDepartmentTasksDateIntervalService from '@modules/tasks/services/ListDepartmentTasksDateIntervalService';
import FakeDepartmentsRepository from '@modules/departments/repositories/fakes/FakeDepartmentsRepository';

let listDepartmentTasksDateIntervalService: ListDepartmentTasksDateIntervalService;
let fakeTasksRepository: FakeTasksRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeDepartmentsRepository: FakeDepartmentsRepository;

describe('ListUserMonthTasksService', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeDepartmentsRepository = new FakeDepartmentsRepository();

    listDepartmentTasksDateIntervalService =
      new ListDepartmentTasksDateIntervalService(fakeTasksRepository);
  });

  it('should be able to list tasks by department from custom date interval', async () => {
    const start_date = new Date(2021, 5, 1);
    const end_date = new Date(2021, 6, 5);
    const task_date = new Date(2021, 5, 5);

    const user = await fakeUsersRepository.create({
      email: 'test@test.com',
      name: 'Test user',
      password: '12345Rr*',
    });

    const department = await fakeDepartmentsRepository.create({
      name: 'Test department',
      owner_id: user.id,
    });

    const task = await fakeTasksRepository.create({
      date: task_date,
      name: 'Task test',
      user_id: user.id,
      department_id: department.id,
    });

    const list = await listDepartmentTasksDateIntervalService.execute({
      start_date,
      end_date,
      department_id: department.id,
    });

    expect(list).toEqual([task]);
  });
});
