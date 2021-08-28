import CreateDepartmentService from '@modules/departments/services/CreateDepartmentService';
import FakeDepartmentsRepository from '@modules/departments/repositories/fakes/FakeDepartmentsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';

let createDepartmentService: CreateDepartmentService;
let fakeDepartmentsRepository: FakeDepartmentsRepository;
let fakeUsersRepository: FakeUsersRepository;

describe('CreateDepartmentService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeDepartmentsRepository = new FakeDepartmentsRepository();
    createDepartmentService = new CreateDepartmentService(
      fakeDepartmentsRepository,
    );
  });

  it('should be able to create a department', async () => {
    const user = await fakeUsersRepository.create({
      email: 'test@test.com',
      name: 'Test user',
      password: '12345Rr*',
    });

    const department = await createDepartmentService.execute({
      name: 'Test Department',
      owner_id: user.id,
    });

    expect(department).toHaveProperty('id');
  });
});
