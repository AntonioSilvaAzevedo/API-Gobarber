interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    }
  }
}

export default {
  driver: process.env.MAIL_DRIVER || 'etheral',

  defaults: {
    from: {
      email: 'antonide.dev@gmail.com',
      name: 'Antonio'
    }
  }
}as IMailConfig;
