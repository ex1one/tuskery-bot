import { Composer, Markup } from 'telegraf';
import { MyContext } from '../types/context';
import { match, reply } from 'telegraf-i18next';

const composer = new Composer<MyContext>();

composer.hears(
  match('menuButtons.tasks'),
  async (ctx) =>
    await ctx.reply(
      ctx.i18next.t('text.chat'),
      Markup.inlineKeyboard([Markup.button.callback(ctx.i18next.t('inlineButtons.personalTasks'), 'personal_tasks')]),
    ),
);

composer.hears(match('menuButtons.personalTask'), async (ctx) => ctx.scene.enter('createScene'));

composer.hears(match('menuButtons.help'), reply('information'));
composer.hears(match('menuButtons.settings'), async (ctx) => {
  const language = ctx.session.locale;

  await ctx.reply(
    ctx.i18next.t('text.settings', { language }),
    Markup.inlineKeyboard([Markup.button.callback(ctx.i18next.t('inlineButtons.switchLanguage'), 'switchLanguage')]),
  );
});

export { composer as listeners };
