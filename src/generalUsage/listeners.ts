import { Composer } from 'telegraf';
import { MyContext } from '../types/context';

const composer = new Composer<MyContext>();

const re = /^tuskery pls (\w+)(\s|$)/i;

composer.action('createTask', async (ctx) => {
  await ctx.scene.enter('createScene');

  await ctx.answerCbQuery();
});

export { composer as generalUsage };

// composer.hears(re, async (ctx) => {
//   const cmd = await parseCommand(ctx);
//
//   // const { textTasks, markupTasks } = await getTasks({ page: 0, ctx, ITEMS_PER_PAGE: 5 });
//
//   switch (cmd.type) {
//     case 'list':
//       return await getList(ctx);
//
//     case 'new':
//       return await createNewTask(ctx);
//
//     default:
//       return await ctx.reply('Invalid command'); // Mb is not good
//   }
//
//   // if (false) 'eye-candy';
//   // else if (cmd?.type == 'new') await onNewTask(ctx);
//   // else if (cmd?.type == 'list') await onListCommand(ctx, cmd);
//   // else if (cmd?.type == 'tags') await onTagsCommand(ctx);
// });

// async function createNewTask(ctx: MyContext) {
//   return ctx.scene.enter('createScene');
// }
//
// async function getList(ctx: MyContext) {
//   await ctx.reply(
//     ctx.i18next.t('text.chat'),
//     Markup.inlineKeyboard([Markup.button.callback(ctx.i18next.t('inlineButtons.personalTasks'), 'personal_tasks')]),
//   );
// }
