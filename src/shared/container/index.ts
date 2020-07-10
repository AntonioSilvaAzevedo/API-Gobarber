import { container } from 'tsyringe';

import '@modules/users/providers'
import './providers';

import IAppointmentsRepositoty from '@modules/appointments/repositories/IAppointmentsRepository';
import AppoitmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepositoty from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IAppointmentsRepositoty>(
  'AppointmentsRepository',
  AppoitmentsRepository,
);

container.registerSingleton<IUsersRepositoty>(
  'UsersRepository',
  UsersRepository,
);
