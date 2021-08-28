import ListDepartmentsService from '@modules/departments/services/ListDepartmentsService';
import FakeDepartmentsRepository from '@modules/departments/repositories/fakes/FakeDepartmentsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';

let listDepartmentsService: ListDepartmentsService;
let fakeDepartmentsRepository: FakeDepartmentsRepository;
let fakeUsersRepository: FakeUsersRepository;

describe('ListDepartmentsService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeDepartmentsRepository = new FakeDepartmentsRepository();
    listDepartmentsService = new ListDepartmentsService(
      fakeDepartmentsRepository,
    );
  });

  it('should be able to create a department', async () => {
    const user = await fakeUsersRepository.create({
      email: 'test@test.com',
      name: 'Test user',
      password: '12345Rr*',
    });

    const department = await fakeDepartmentsRepository.create({
      name: 'Test Department',
      owner_id: user.id,
    });

    const list = await listDepartmentsService.execute();

    expect(list).toEqual([department]);
  });
});
