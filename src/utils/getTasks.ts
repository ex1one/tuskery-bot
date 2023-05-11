import { Markup } from 'telegraf';
import prisma from '../../prisma';
import { MyContext } from '../types/context';
import { logger } from '../logger/pino';
import {
  PrismaClientKnownRequestError,
  PrismaClientInitializationError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
  PrismaClientRustPanicError,
} from '@prisma/client/runtime';

type PrismaError =
  | PrismaClientKnownRequestError
  | PrismaClientInitializationError
  | PrismaClientUnknownRequestError
  | PrismaClientValidationError
  | PrismaClientRustPanicError;

interface getTasksProps {
  page: number;
  ITEMS_PER_PAGE: number;
  ctx: MyContext;
  prevMessage?: boolean;
  error?: Error | PrismaError | string;
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

    const markupTasks = Markup.inlineKeyboard([
      tasks.map((t, index) => Markup.button.callback(`${index + 1}`, `taskId=${t.id}&page=${page}`)),
      [Markup.button.callback(ctx.i18next.t('inlineButtons.prevPage'), `prev:${page - 1}`, page === 0)],
      [Markup.button.callback(ctx.i18next.t('inlineButtons.nextPage'), `next:${page + 1}`, !hasMore)],
    ]);

    let textTasks = '';

    for (let i = 0; i < tasks.length; i++) {
      textTasks = textTasks + `${i + 1}. ${tasks[i]?.name}\n`;
    }

    // Подумать над тем, как это нормально декомпозировать

    if (!count) {
      return prevMessage
        ? await ctx.editMessageText(
            'Не найдено никаких задач, попробуйте добавить',
            Markup.inlineKeyboard([Markup.button.callback('Добавить задачу', 'createTask')]),
          )
        : await ctx.reply(
            'Не найдено никаких задач, попробуйте добавить',
            Markup.inlineKeyboard([Markup.button.callback('Добавить задачу', 'createTask')]),
          );
    }

    prevMessage
      ? await ctx.editMessageText(ctx.i18next.t('text.tasksList', { textTasks }), {
          parse_mode: 'HTML',
          ...markupTasks,
        })
      : await ctx.replyWithHTML(ctx.i18next.t('text.tasksList', { textTasks }), {
          parse_mode: 'HTML',
          ...markupTasks,
        });
  } catch (error) {
    logger.error({ error }, 'Error in trying to get tasks');

    await ctx.reply('Что-то пошло не так, повторите попытку.');
  }
};
