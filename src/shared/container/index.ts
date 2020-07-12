import { container } from 'tsyringe';

import '@modules/users/providers'
import './providers';

import IAppointmentsRepositoty from '@modules/appointments/repositories/IAppointmentsRepository';
import AppoitmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepositoty from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

container.registerSingleton<IAppointmentsRepositoty>(
  'AppointmentsRepository',
  AppoitmentsRepository,
);

container.registerSingleton<IUsersRepositoty>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokenRepository>(
  'UserTokensRepository',
  UserTokensRepository,
)
