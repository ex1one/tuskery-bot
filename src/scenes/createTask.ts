import { Scenes, Markup, deunionize } from 'telegraf';
import { MyContext } from '../types/context';

import { MenuKeyboards } from '../keybords/menuKeyboards';
import { getTasks } from '../utils/getTasks';
import prisma from '../../prisma';

export const createrScene = new Scenes.BaseScene<MyContext>('createScene');

createrScene.enter(async (ctx) => {
  return await ctx.reply(ctx.i18next.t('text.createNewTask', Markup.forceReply()));
});

createrScene.on('text', async (ctx) => {
  const text = String(ctx.message.text).trim();

  if (text.length) {
    return await ctx.scene.leave();
  }
});

createrScene.leave(async (ctx) => {
  const { text, chat } = deunionize(ctx.message);

  await prisma.task.create({ data: { text, chatId: chat.id } });

  await ctx.reply(ctx.i18next.t('text.createNewTaskSuccess', { name: text }), MenuKeyboards(ctx));

  const { textTasks, markupTasks } = await getTasks({ page: 0, ctx, ITEMS_PER_PAGE: 5 });

  await ctx.replyWithHTML(ctx.i18next.t('text.tasksList', { textTasks }), markupTasks);
});
