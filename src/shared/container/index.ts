import { container } from 'tsyringe';

import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';

import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import FakeTasksRepository from '@modules/tasks/repositories/fakes/FakeTasksRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  FakeUsersRepository,
);

container.registerSingleton<ITasksRepository>(
  'TasksRepository',
  FakeTasksRepository,
);
