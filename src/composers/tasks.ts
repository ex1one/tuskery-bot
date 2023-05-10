import { Composer, Markup } from 'telegraf';
import { MyContext } from '../types/context';

import { getTasks } from '../utils/getTasks';
import { getParams } from '../utils/getParams';

import prisma from '../../prisma';
import { ITEMS_PER_PAGE } from '../constants';

const composer = new Composer<MyContext>();

composer.command('list', async (ctx) => await getTasks({ page: 0, ctx, ITEMS_PER_PAGE }));

composer.action('list', async (ctx) => {
  await getTasks({ page: 0, ctx, ITEMS_PER_PAGE });

  await ctx.answerCbQuery();
});

composer.action(/^(prev|next):([0-9]+)$/, async (ctx) => {
  const page = Number(ctx.match[0].split(':')[1]);

  await getTasks({ page, ctx, ITEMS_PER_PAGE });

  await ctx.answerCbQuery();
});

composer.action(/^taskId=(0|([1-9]\d{0,3}))?&page=(0|([1-9]\d{0,3}))?$/, async (ctx) => {
  const params = ctx.match[0].split('&');
  const { taskId, page } = getParams<{ page: number; taskId: number }>(params);

  const currentTask = await prisma.task.findFirst({ where: { id: taskId } });

  await ctx.editMessageText(
    ctx.i18next.t('text.task', { name: currentTask.name }),
    Markup.inlineKeyboard([
      [Markup.button.callback('✅', `complete=${taskId}&page=${page}`)],
      [Markup.button.callback(ctx.i18next.t('inlineButtons.tasks'), 'list')],
    ]),
  );

  await ctx.answerCbQuery();
});

composer.action(/^complete=(0|([1-9]\d{0,3}))?&page=(0|([1-9]\d{0,3}))?$/, async (ctx) => {
  const params = ctx.match[0].split('&');
  const { page, complete } = getParams<{ page: number; complete: number }>(params);

  const deletedTask = await prisma.task.delete({ where: { id: complete } });

  if (deletedTask) {
    await ctx.answerCbQuery(ctx.i18next.t('text.completeTask'));

    await getTasks({ page, ctx, ITEMS_PER_PAGE });
  }
});

export { composer as tasks };
