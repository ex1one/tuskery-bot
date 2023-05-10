import { Markup } from 'telegraf';

export const MenuKeyboards = (ctx) =>
  Markup.keyboard(
    [
      ctx.i18next.t('menuButtons.tasks'),
      ctx.i18next.t('menuButtons.createTask'),
      ctx.i18next.t('menuButtons.help'),
      ctx.i18next.t('menuButtons.settings'),
    ],
    { columns: 2 },
  ).resize();
