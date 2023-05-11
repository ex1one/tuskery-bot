import { Scenes, deunionize } from 'telegraf';
import { MyContext } from '../types/context';

import { MenuKeyboards } from '../keybords/menuKeyboards';
import { getTasks } from '../utils/getTasks';
import { ITEMS_PER_PAGE } from '../constants';
import prisma from '../../prisma';

import { logger } from '../logger/pino';

export const createrScene = new Scenes.BaseScene<MyContext>('createScene');

createrScene.enter(async (ctx) => await ctx.reply(ctx.i18next.t('text.createNewTask')));

// Нужно уметь сохранять состояние схемы, чтобы тут ничего не отвалилось
createrScene.on('message', async (ctx) => {
  const { text } = deunionize(ctx.message);

  // Проверка
  // if (text == match('menuButtons.tasks')) {
  //   return await ctx.reply('Введите валидное имя');
  // }

  return await ctx.scene.leave();
});

createrScene.leave(async (ctx) => {
  const { text } = deunionize(ctx.message);
  const { id, username } = deunionize(ctx.chat);

  try {
    await prisma.task.create({ data: { name: text, channelId: `${id}`, author: username } });

    await ctx.reply(ctx.i18next.t('text.createNewTaskSuccess', { name: text }), MenuKeyboards(ctx));

    await getTasks({ page: 0, ctx, ITEMS_PER_PAGE });
  } catch (error) {
    logger.error({ error }, 'Error with task creation');

    await ctx.reply('Произошла ошибка, повторите ещё раз'); // Сделать для ошибок, отдельные переводы
  }
});
