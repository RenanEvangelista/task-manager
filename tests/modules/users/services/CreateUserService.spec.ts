import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import CreateUserService from '@modules/users/services/CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let createUserService: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    createUserService = new CreateUserService(fakeUsersRepository);
  });

  it('should be able to create user', async () => {
    const user = await createUserService.execute({
      name: 'Renan Evangelista',
      email: 'renan@gmail.com',
      password: '545454Rr*',
    });

    expect(user).toHaveProperty('id');
  });
});
