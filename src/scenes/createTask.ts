import { Scenes, deunionize } from 'telegraf';
import { MyContext } from '../types/context';

import { MenuKeyboards } from '../keybords/menuKeyboards';
import { getTasks } from '../utils/getTasks';
import prisma from '../../prisma';
import { ITEMS_PER_PAGE } from '../constants';

export const createrScene = new Scenes.BaseScene<MyContext>('createScene');

createrScene.enter(async (ctx) => {
  console.log('Start Scene');

  return await ctx.reply(ctx.i18next.t('text.createNewTask'));
});

createrScene.on('text', async (ctx) => {
  const text = String(ctx.message.text).trim();

  console.log('Middle Scene');

  if (text.length) {
    return await ctx.scene.leave();
  }
});

createrScene.leave(async (ctx) => {
  const { text } = deunionize(ctx.message);
  const { id, username } = deunionize(ctx.chat);

  console.log('Leave Scene');

  await prisma.task.create({ data: { name: text, channelId: Math.abs(id), author: username } });

  await ctx.reply(ctx.i18next.t('text.createNewTaskSuccess', { name: text }), MenuKeyboards(ctx));

  await getTasks({ page: 0, ctx, ITEMS_PER_PAGE });
});
