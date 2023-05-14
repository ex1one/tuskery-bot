import { Composer, Markup } from 'telegraf';
import { match, reply } from 'telegraf-i18next';

import { MyContext } from '../types/context';
import { getTasks } from '../utils/getTasks';

import { ITEMS_PER_PAGE } from '../constants';

const composer = new Composer<MyContext>();

composer.hears(match('menuButtons.tasks'), async (ctx) => await getTasks({ page: 0, ctx, ITEMS_PER_PAGE }));

composer.hears(match('menuButtons.createTask'), async (ctx) => ctx.scene.enter('createTaskScene'));

composer.hears(match('menuButtons.help'), reply('information'));
composer.hears(match('menuButtons.settings'), async (ctx) => {
  const language = ctx.session.locale;

  await ctx.reply(
    ctx.i18next.t('text.settings', { language }),
    Markup.inlineKeyboard([Markup.button.callback(ctx.i18next.t('inlineButtons.switchLanguage'), 'switchLanguage')]),
  );
});

export { composer as listeners };
