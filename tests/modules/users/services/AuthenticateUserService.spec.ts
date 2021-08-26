import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '@shared/providers/HashProvider/FakeHashProvider';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import AppError from '@shared/errors/AppError';

let authenticateUser: AuthenticateUserService;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

describe('AuthenticateUserService', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Test User',
      email: 'test@test.com',
      password: '12345Rr*12345',
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

  it('should not be able to authenticate user with incorrect password', async () => {
    await fakeUsersRepository.create({
      email: 'test@test.com',
      name: 'Test User',
      password: '12345Rr*',
    });

    await expect(
      authenticateUser.execute({
        email: 'test@test.com',
        password: 'incorrectPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
