import AddDepartmentUsersService from '@modules/departments/services/AddDepartmentUsersService';

import FakeDepartmentsRepository from '@modules/departments/repositories/fakes/FakeDepartmentsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import AppError from '@shared/errors/AppError';

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

  it('should not be able to add a user with a non-existing user', async () => {
    const owner = await fakeUsersRepository.create({
      email: 'owner@owner.com',
      name: 'Test owner',
      password: '12345Rr*',
    });

    const department = await fakeDepartmentsRepository.create({
      name: 'Test Department',
      owner_id: owner.id,
    });

    await expect(
      addDepartmentUsersService.execute({
        department_id: department.id,
        user_id: 'invalid_user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
