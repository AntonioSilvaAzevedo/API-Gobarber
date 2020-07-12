import {injectable, inject} from 'tsyringe';
import path from 'path';

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

    @inject('UserTokensRepository')
    private userTokenRepository: IUserTokeRepository,
  ){}

  public async execute({email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) { // checa se o usuario existe para a alteração de password
      throw new AppError('User does not exists');
    }

    const { token } = await this.userTokenRepository.generate(user.id); // gera um token apos o usuario ser validado

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs'
    )

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[GoBaber] Recuperação de senha',
      templateDate: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
