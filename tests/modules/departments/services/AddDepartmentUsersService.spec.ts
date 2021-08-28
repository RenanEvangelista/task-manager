import AddDepartmentUsersService from '@modules/departments/services/AddDepartmentUsersService';

import FakeDepartmentsRepository from '@modules/departments/repositories/fakes/FakeDepartmentsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';

let addDepartmentUsersService: AddDepartmentUsersService;
let fakeDepartmentsRepository: FakeDepartmentsRepository;
let fakeUsersRepository: FakeUsersRepository;

describe('AddDepartmentUsersService', () => {
  beforeEach(() => {
    fakeDepartmentsRepository = new FakeDepartmentsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    addDepartmentUsersService = new AddDepartmentUsersService(
      fakeDepartmentsRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to add user to department', async () => {
    const owner = await fakeUsersRepository.create({
      email: 'owner@owner.com',
      name: 'Test owner',
      password: '12345Rr*',
    });

    const user = await fakeUsersRepository.create({
      email: 'test@test.com',
      name: 'Test user',
      password: '12345Rr*',
    });

    const department = await fakeDepartmentsRepository.create({
      name: 'Test Department',
      owner_id: owner.id,
    });

    const departmentWithNewUser = await addDepartmentUsersService.execute({
      department_id: department.id,
      user_id: user.id,
    });

    const expected = department;
    expected.users = [user];

    expect(departmentWithNewUser).toEqual(expected);
  });
});
