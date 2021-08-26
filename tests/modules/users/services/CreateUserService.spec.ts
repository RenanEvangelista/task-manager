import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@shared/container/providers/HashProvider/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create user', async () => {
    const user = await createUserService.execute({
      name: 'Test User',
      email: 'test@test.com',
      password: '12345Rr*',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create user with same email', async () => {
    await createUserService.execute({
      name: 'Test User',
      email: 'test@test.com',
      password: '12345Rr*',
    });

    await expect(
      createUserService.execute({
        name: 'Test User 2',
        email: 'test@test.com',
        password: '123456Rr*',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("ensure the user's password is encrypted", async () => {
    const user = await createUserService.execute({
      name: 'Test User',
      email: 'test@test.com',
      password: '12345Rr*',
    });

    expect(user.password).not.toBe('12345Rr*');
  });
});
