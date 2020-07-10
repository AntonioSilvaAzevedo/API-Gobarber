import {injectable, inject} from 'tsyringe';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokeRepository from '../repositories/IUserTokenRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokeRepository,
  ){}

  public async execute({email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) { // checa se o usuario existe para a alteração de password
      throw new AppError('User does not exists');
    }

    await this.userTokenRepository.generate(user.id); // gera um token apos o usuario ser validado

    this.mailProvider.sendMail(
      email,
      'Pedido de recuperação de senha recebido, '
    );
  }
}

export default SendForgotPasswordEmailService;
