import prisma from '../../prisma';

import { MyContext } from '../types/context';
import { logger } from '../logger/pino';

import { getInlineCreateTaskButton, getInlineTasksButtons } from '../keybords/inlineKeyboards';

import { getTasksText } from './getTasksText';

interface getTasksProps {
  page: number;
  ITEMS_PER_PAGE: number;
  ctx: MyContext;
  prevMessage?: boolean;
}

export const getTasks = async ({ page, ctx, ITEMS_PER_PAGE, prevMessage = false }: getTasksProps) => {
  try {
    logger.info('Try to get tasks');

    const [tasks, count] = await prisma.$transaction([
      prisma.task.findMany({
        where: { channelId: `${ctx.chat.id}` },
        skip: page * ITEMS_PER_PAGE,
        take: ITEMS_PER_PAGE,
      }),
      prisma.task.count({ where: { channelId: `${ctx.chat.id}` } }),
    ]);

    logger.info({ tasks, count }, 'Get Tasks');

    const hasMore = count - page * ITEMS_PER_PAGE > 5;

    if (!count) {
      return prevMessage
        ? await ctx.editMessageText('Не найдено никаких задач, попробуйте добавить', getInlineCreateTaskButton())
        : await ctx.reply('Не найдено никаких задач, попробуйте добавить', getInlineCreateTaskButton());
    }

    // Подумать как убрать prevMessage, хотя можно и оставить, всё равно подумать
    prevMessage
      ? await ctx.editMessageText(ctx.i18next.t('text.tasksList', getTasksText(tasks)), {
          parse_mode: 'HTML',
          ...getInlineTasksButtons({ ctx, tasks, page, hasMore }),
        })
      : await ctx.replyWithHTML(ctx.i18next.t('text.tasksList', getTasksText(tasks)), {
          parse_mode: 'HTML',
          ...getInlineTasksButtons({ ctx, tasks, page, hasMore }),
        });
  } catch (error) {
    logger.error({ error }, 'Error in trying to get tasks');

    await ctx.reply(ctx.i18next.t('text.error', { error }));
  }
};
