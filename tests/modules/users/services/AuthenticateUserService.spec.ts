import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import AppError from '@shared/errors/AppError';

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

  it('should not be able to authenticate non-existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'test@test.com',
        password: '12345Rr*',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
