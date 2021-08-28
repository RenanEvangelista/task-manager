import { container } from 'tsyringe';

import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import TypeOrmUserRepository from '@modules/users/repositories/implementations/TypeormUserRepository';

import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import TypeOrmTasksRepository from '@modules/tasks/repositories/implementations/TypeOrmTasksRepository';

import IDepartmentsRepository from '@modules/departments/repositories/IDepartmentsRepository';
import TypeOrmDepartmentsRepository from '@modules/departments/repositories/implementations/TypeOrmDepartmentsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  TypeOrmUserRepository,
);

container.registerSingleton<ITasksRepository>(
  'TasksRepository',
  TypeOrmTasksRepository,
);

container.registerSingleton<IDepartmentsRepository>(
  'DepartmentsRepository',
  TypeOrmDepartmentsRepository,
);
