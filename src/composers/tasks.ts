import { Composer, Markup } from 'telegraf';
import { MyContext } from '../types/context';

import { getTasks } from '../utils/getTasks';
import { getParams } from '../utils/getParams';

import prisma from '../../prisma';
import { ITEMS_PER_PAGE } from '../constants';
import { logger } from '../logger/pino';

const composer = new Composer<MyContext>();

// Get List use Command "/list"
composer.command('list', async (ctx) => {
  await getTasks({ page: 0, ctx, ITEMS_PER_PAGE });
});

// Get List used action "list"
composer.action('list', async (ctx) => {
  await getTasks({ page: 0, ctx, ITEMS_PER_PAGE, prevMessage: true });

  await ctx.answerCbQuery();
});

// Pagination
composer.action(/^(prev|next):([0-9]+)$/, async (ctx) => {
  const page = Number(ctx.match[0].split(':')[1]);

  await getTasks({ page, ctx, ITEMS_PER_PAGE, prevMessage: true });

  await ctx.answerCbQuery();
});

// Get Current Task
composer.action(/^taskId=(0|([1-9]\d{0,3}))?&page=(0|([1-9]\d{0,3}))?$/, async (ctx) => {
  // Нужно обработать ошибку, когда не найдена задача

  const params = ctx.match[0].split('&');
  const { taskId, page } = getParams<{ page: number; taskId: number }>(params);

  const currentTask = await prisma.task.findFirst({ where: { id: taskId } });

  await ctx.editMessageText(
    ctx.i18next.t('text.task', { name: currentTask.name, state: currentTask.state }),
    Markup.inlineKeyboard([
      [
        Markup.button.callback('✅', `complete=${taskId}&page=${page}`, currentTask.state == 'RESOLVED'),
        Markup.button.callback('❌', `deleteId=${taskId}&page=${page}`),
      ],
      [Markup.button.callback(ctx.i18next.t('inlineButtons.tasks'), 'list')],
    ]),
  );

  await ctx.answerCbQuery();
});

// UpdateTask

// Может быть ошибка при измении таски, обработать нужно
composer.action(/^complete=(0|([1-9]\d{0,3}))?&page=(0|([1-9]\d{0,3}))?$/, async (ctx) => {
  try {
    const params = ctx.match[0].split('&');
    const { page, complete } = getParams<{ page: number; complete: number }>(params);

    await prisma.task.update({
      where: { id: complete },
      data: {
        state: 'RESOLVED',
        resolvedAt: new Date(),
      },
    });

    await ctx.answerCbQuery(ctx.i18next.t('text.completeTask'));

    await getTasks({ page, ctx, ITEMS_PER_PAGE, prevMessage: true });
  } catch (error) {
    logger.error({ error }, 'Error updating the task');

    await ctx.answerCbQuery('Произошла ошибка, повторите ещё раз'); // Сделать для ошибок, отдельные переводы
  }
});

// Delete task
composer.action(/^deleteId=(0|([1-9]\d{0,3}))?&page=(0|([1-9]\d{0,3}))?$/, async (ctx) => {
  try {
    const params = ctx.match[0].split('&');
    const { deleteId, page } = getParams<{ page: number; deleteId: number }>(params);

    await prisma.task.delete({ where: { id: deleteId } });

    await ctx.answerCbQuery('Задача успешно удалена'); // Сделать для ошибок, отдельные переводы

    await getTasks({ page, ctx, ITEMS_PER_PAGE, prevMessage: true });
  } catch (error) {
    logger.error({ error }, 'Error deleting a task');

    await ctx.answerCbQuery('Произошла ошибка, повторите ещё раз'); // Сделать для ошибок, отдельные переводы
  }
});

export { composer as tasks };
