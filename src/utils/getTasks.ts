import { Markup } from 'telegraf';
import prisma from '../../prisma';
import { MyContext } from '../types/context';

interface getTasksProps {
  page: number;
  ITEMS_PER_PAGE: number;
  ctx: MyContext;
}

export const getTasks = async ({ page, ctx, ITEMS_PER_PAGE }: getTasksProps) => {
  const [tasks, count] = await prisma.$transaction([
    prisma.task.findMany({ where: { channelId: ctx.chat.id }, skip: page * ITEMS_PER_PAGE, take: ITEMS_PER_PAGE }),
    prisma.task.count(),
  ]);

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

  if (!count) {
    return await ctx.editMessageText(
      'Не найдено никаких задач, попробуйте добавить',
      Markup.inlineKeyboard([Markup.button.callback('Добавить задачу', 'createTask')]),
    );
  }

  return await ctx.replyWithHTML(ctx.i18next.t('text.tasksList', { textTasks }), {
    parse_mode: 'HTML',
    ...markupTasks,
  });
};
