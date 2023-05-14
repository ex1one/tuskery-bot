import { Composer } from 'telegraf';
import prisma from '../../prisma';

import { getInlineTaskButtons } from '../keybords/inlineKeyboards';

import { getParams } from '../utils/getParams';
import { getTasks } from '../utils/getTasks';

import { logger } from '../logger/pino';

import { ITEMS_PER_PAGE } from '../constants';
import { MyContext } from '../types/context';

const composer = new Composer<MyContext>();

// Get Current Task
composer.action(/^taskId=(0|([1-9]\d{0,3}))?&page=(0|([1-9]\d{0,3}))?$/, async (ctx) => {
  try {
    const params = ctx.match[0].split('&');
    const { taskId, page } = getParams<{ page: number; taskId: number }>(params);

    const currentTask = await prisma.task.findFirst({ where: { id: taskId } });

    if (!currentTask) throw new Error('Task is not found'); // Это он ругается, смысл тут вызывать ошибку, а потом её отлавливать в catch

    await ctx.editMessageText(
      ctx.i18next.t('text.task', { name: currentTask.name, state: currentTask.state }),
      getInlineTaskButtons({ page, currentTask, ctx }),
    );

    await ctx.answerCbQuery();
  } catch (error) {
    logger.error({ error }, 'Get Error in try to get Task');

    await ctx.reply(ctx.i18next.t('text.error', { error }));
  }
});

// UpdateTask
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

    await ctx.answerCbQuery(ctx.i18next.t('text.error', { error }));
  }
});

// Delete task
composer.action(/^deleteId=(0|([1-9]\d{0,3}))?&page=(0|([1-9]\d{0,3}))?$/, async (ctx) => {
  try {
    const params = ctx.match[0].split('&');
    const { deleteId, page } = getParams<{ page: number; deleteId: number }>(params);

    await prisma.task.delete({ where: { id: deleteId } });

    await ctx.answerCbQuery(ctx.i18next.t('text.success'));

    await getTasks({ page, ctx, ITEMS_PER_PAGE, prevMessage: true });
  } catch (error) {
    logger.error({ error }, 'Error deleting a task');

    await ctx.answerCbQuery(ctx.i18next.t('text.error', { error }));
  }
});

export { composer as task };
