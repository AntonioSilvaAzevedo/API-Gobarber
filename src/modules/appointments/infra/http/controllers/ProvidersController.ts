import {Request, Response} from 'express';
import { container } from 'tsyringe';

import ListProvidersService from '@modules/appointments/services/ListProviderService';

export default class ProvidersController {
  public async index(reques: Request, response: Response): Promise<Response> {
    const user_id = reques.user.id;

    const listProviders = container.resolve(ListProvidersService);

    const providers = await listProviders.execute({
      user_id,
    });

    return response.json(providers);
    }
}
