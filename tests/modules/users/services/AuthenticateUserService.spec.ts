import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

let authenticateUser: AuthenticateUserService;
let fakeUsersRepository: FakeUsersRepository;

describe('AuthenticateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    authenticateUser = new AuthenticateUserService(fakeUsersRepository);
  });

  it('should be able to authenticate user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Test User',
      email: 'test@test.com',
      password: '12345Rr*',
    });

    const response = await authenticateUser.execute({
      email: 'test@test.com',
      password: '12345Rr*',
    });

    expect(response.user).toEqual(user);
    expect(response).toHaveProperty('token');
  });
});
