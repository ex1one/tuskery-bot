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
    prisma.task.findMany({ skip: page * ITEMS_PER_PAGE, take: ITEMS_PER_PAGE }),
    prisma.task.count(),
  ]);

  const hasMore = count - page * ITEMS_PER_PAGE > 5;

  const markupTasks = Markup.inlineKeyboard([
    tasks.map((t, index) => Markup.button.callback(`${index + 1}`, `taskId=${t.id}&page=${page}`)),
    [Markup.button.callback(ctx.i18next.t('inlineButtons.prevPage'), `prev:${page - 1}`, page === 0)],
    [Markup.button.callback(ctx.i18next.t('inlineButtons.nextPage'), `next:${page + 1}`, !hasMore)],
    [Markup.button.callback(ctx.i18next.t('inlineButtons.chatList'), 'chatList')],
  ]);

  let textTasks = '';

  for (let i = 0; i < tasks.length; i++) {
    textTasks = textTasks + `${i + 1}. ${tasks[i]?.text}\n`;
  }

  console.log(textTasks, 'tasks');

  return { textTasks, markupTasks, tasks };
};
