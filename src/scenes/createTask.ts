import { Scenes, deunionize } from 'telegraf';
import { MyContext } from '../types/context';
import prisma from '../../prisma';

import { getTasks } from '../utils/getTasks';
import { ITEMS_PER_PAGE } from '../constants';

import { logger } from '../logger/pino';
import { MenuKeyboards } from '../keybords/keyboards';

const scene = new Scenes.BaseScene<MyContext>('createTaskScene');

scene.enter(async (ctx) => await ctx.reply(ctx.i18next.t('text.createNewTask')));

scene.on('message', async (ctx) => {
  const { text } = deunionize(ctx.message);

  // Проверка
  // if (text == match('menuButtons.tasks')) {
  //   return await ctx.reply('Введите валидное имя');
  // }

  return await ctx.scene.leave();
});

scene.leave(async (ctx) => {
  try {
    const { text } = deunionize(ctx.message);
    const { id, username } = deunionize(ctx.chat);

    await prisma.task.create({ data: { name: text, channelId: `${id}`, author: username } });

    await ctx.reply(ctx.i18next.t('text.createNewTaskSuccess', { name: text }), MenuKeyboards(ctx));

    await getTasks({ page: 0, ctx, ITEMS_PER_PAGE });
  } catch (error) {
    logger.error({ error }, 'Error with task creation');

    //TODO Возможно можно крч, делать обёртку, над каждым куском кода, где мб ошибка выброшена и там уже обрабатывать это, подумать крч
    await ctx.reply(ctx.i18next.t('text.error', { error })); //TODO Это бы куда-нибудь в middleware прокинуть, потому что каждый раз так писать, устанешь) Во
  }
});

export { scene as createTask };
