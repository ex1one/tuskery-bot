import { Composer } from 'telegraf';
import { MyContext } from '../types/context';
import { getTasks } from '../utils/getTasks';
import { ITEMS_PER_PAGE } from '../constants';

const composer = new Composer<MyContext>();

// Get List use command "/list"
composer.command('list', async (ctx) => await getTasks({ page: 0, ctx, ITEMS_PER_PAGE }));

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

export { composer as tasks };
