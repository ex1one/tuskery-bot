import { Markup } from 'telegraf';

// Types
import { GetInlineTasksButtonsProps } from './types';

export const getInlineCreateTaskButton = () =>
  Markup.inlineKeyboard([Markup.button.callback('Добавить задачу', 'createTask')]);

export const getInlineTasksButtons = ({ page, hasMore, tasks, ctx }: GetInlineTasksButtonsProps) =>
  Markup.inlineKeyboard([
    tasks.map((t, index) => Markup.button.callback(`${index + 1}`, `taskId=${t.id}&page=${page}`)),
    [Markup.button.callback(ctx.i18next.t('inlineButtons.prevPage'), `prev:${page - 1}`, page === 0)],
    [Markup.button.callback(ctx.i18next.t('inlineButtons.nextPage'), `next:${page + 1}`, !hasMore)],
  ]);

export const getInlineTaskButtons = ({ page, ctx, currentTask }) =>
  Markup.inlineKeyboard([
    [
      Markup.button.callback('✅', `complete=${currentTask.id}&page=${page}`, currentTask.state == 'RESOLVED'),
      Markup.button.callback('❌', `deleteId=${currentTask.id}&page=${page}`),
    ],
    [Markup.button.callback(ctx.i18next.t('inlineButtons.tasks'), 'list')],
  ]);
