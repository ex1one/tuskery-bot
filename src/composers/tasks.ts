import { Composer, Markup } from 'telegraf';
import { MyContext } from '../types/context';

import { getTasks } from '../utils/getTasks';
import { getParams } from '../utils/getParams';

import prisma from '../../prisma';

const composer = new Composer<MyContext>();

const ITEMS_PER_PAGE = 5;

composer.command('list', async (ctx) => {
  await ctx.reply(
    ctx.i18next.t('text.chat'),
    Markup.inlineKeyboard([Markup.button.callback(ctx.i18next.t('inlineButtons.personalTasks'), 'personal_tasks')]),
  );
});

composer.action('chatList', async (ctx) => {
  await ctx.editMessageText(
    ctx.i18next.t('text.chat'),
    Markup.inlineKeyboard([Markup.button.callback(ctx.i18next.t('inlineButtons.personalTasks'), 'personal_tasks')]),
  );

  await ctx.answerCbQuery();
});

composer.action('personal_tasks', async (ctx) => {
  const { textTasks, markupTasks } = await getTasks({ page: 0, ctx, ITEMS_PER_PAGE });

  await ctx.editMessageText(ctx.i18next.t('text.tasksList', { textTasks }), {
    parse_mode: 'HTML',
    ...markupTasks,
  });

  await ctx.answerCbQuery();
});

composer.action(/^(prev|next):([0-9]+)$/, async (ctx) => {
  const page = Number(ctx.match[0].split(':')[1]);

  const { textTasks, markupTasks } = await getTasks({ page, ctx, ITEMS_PER_PAGE });

  await ctx.editMessageText(ctx.i18next.t('text.tasksList', { textTasks }), {
    parse_mode: 'HTML',
    ...markupTasks,
  });

  await ctx.answerCbQuery();
});

composer.action(/^taskId=(0|([1-9]\d{0,3}))?&page=(0|([1-9]\d{0,3}))?$/, async (ctx) => {
  const params = ctx.match[0].split('&');
  const { taskId, page } = getParams<{ page: number; taskId: number }>(params);

  const currentTask = await prisma.task.findFirst({ where: { id: taskId } });

  await ctx.editMessageText(
    ctx.i18next.t('text.task', { name: currentTask.text }),
    Markup.inlineKeyboard([
      [Markup.button.callback('✅', `complete=${taskId}&page=${page}`)],
      [Markup.button.callback(ctx.i18next.t('inlineButtons.personalTasks'), 'personal_tasks')],
    ]),
  );

  await ctx.answerCbQuery();
});

composer.action(/^complete=(0|([1-9]\d{0,3}))?&page=(0|([1-9]\d{0,3}))?$/, async (ctx) => {
  const params = ctx.match[0].split('&');
  const { page, complete } = getParams<{ page: number; complete: number }>(params);

  const deletedTask = await prisma.task.delete({ where: { id: complete } });

  if (deletedTask) ctx.answerCbQuery(ctx.i18next.t('text.completeTask'));

  const { textTasks, markupTasks } = await getTasks({ page, ctx, ITEMS_PER_PAGE });

  await ctx.editMessageText(ctx.i18next.t('text.tasksList', { textTasks }), { parse_mode: 'HTML', ...markupTasks });
});

export { composer as tasks };
