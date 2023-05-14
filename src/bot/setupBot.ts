import { Telegraf } from 'telegraf';
import { MyContext } from '../types/context';
import { logger } from '../logger/pino';

export const setupBot = (environment) => {
  let bot;

  switch (environment) {
    case 'PRODUCTION':
      bot = new Telegraf<MyContext>(process.env.BOT_TOKEN);
      bot.startWebhook(`/${process.env.BOT_TOKEN}`, null, 3019);

      bot
        .launch({
          webhook: {
            domain: 'tuskery.ex1one.ru',
            port: 3019,
          },
        })
        .then(() => {
          logger.info(`The bot ${bot.botInfo.username} is running on server`);
        });

      break;
    default:
      bot = new Telegraf<MyContext>(process.env.BOT_TOKEN);

      bot.launch().then(() => {
        logger.info(`The bot ${bot.botInfo.username} is running locally`);
      });

      break;
  }

  return bot;
};
