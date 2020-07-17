import {injectable, inject} from 'tsyringe';
import {getDaysInMonth, getDate} from 'date-fns'; // getDaysInMonth = retorna quantos dias tem no mes.

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    year,
    month
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      {
        provider_id,
        year,
        month,
      });

    const nunberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      { length: nunberOfDaysInMonth }, //tamanho do array
      (_, index) => index + 1,
    );
    console.log(eachDayArray)

    const availability = eachDayArray.map(day => {
      const appointmentsInDay = appointments.filter( appointment => {
        return getDate(appointment.date) === day;
      });

      return {
        day,
        available: appointmentsInDay.length < 10,
      }
    });

    return availability;
  }
}

export default ListProviderMonthAvailabityService;
