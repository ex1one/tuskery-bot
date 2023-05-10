import { Telegraf, Scenes, session } from 'telegraf';
import { MyContext } from '../types/context';

import * as dotenv from 'dotenv';

import { start } from '../composers/start.bot';
import { tasks } from '../composers/tasks';
import { language } from '../composers/language';

import { createrScene } from '../scenes/createTask';

import { listeners } from '../listeners';

// General
import { generalUsage } from '../generalUsage/listeners';
import { generalUsageCommands } from '../generalUsage/commands/commands';

dotenv.config({ path: '../../.env' });

const bot = new Telegraf<MyContext>(process.env.BOT_TOKEN);

const stage = new Scenes.Stage<MyContext>([createrScene]);

bot.use(session({ defaultSession: () => ({ locale: 'ru' }) }));
bot.use(language);
bot.use(stage.middleware());

bot.command('create', (ctx) => ctx.scene.enter('createScene'));

bot.use(start);
bot.use(listeners);
bot.use(tasks);

bot.use(generalUsageCommands);
bot.use(generalUsage);

bot.launch();

bot.catch(async (error, ctx) => {
  bot.stop();

  console.error(error);

  await ctx.replyWithHTML(`Произошла ошибка - ${error}`);

  bot.launch();
}); // Handle Error

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
