import { Composer } from 'telegraf';
import { i18next } from 'telegraf-i18next';

import { MyContext } from '../types/context';

import { ru } from '../locales/ru';
import { en } from '../locales/en';

import { MenuKeyboards } from '../keybords/keyboards';

const composer = new Composer<MyContext>();

composer.use(
  i18next({
    lng: 'ru',
    fallbackLng: 'ru',
    resources: { ru, en },
  }),
);

composer.action('switchLanguage', async (ctx) => {
  const language = ctx.i18next.language == 'en' ? 'ru' : 'en';

  ctx.i18next.changeLanguage(language);

  await ctx.reply(ctx.i18next.t('text.switchLanguage'), MenuKeyboards(ctx));

  await ctx.answerCbQuery();
});

export { composer as language };
