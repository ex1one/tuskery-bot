import { Composer } from 'telegraf';

import { MyContext } from '../types/context';
import { MenuKeyboards } from '../keybords/keyboards';

const composer = new Composer<MyContext>();

composer.command('start', async (ctx) => await ctx.reply(ctx.i18next.t('information'), MenuKeyboards(ctx)));

composer.command('menu', async (ctx) => await ctx.reply(ctx.i18next.t('information'), MenuKeyboards(ctx)));

composer.command('help', async (ctx) => await ctx.reply(ctx.i18next.t('information'), MenuKeyboards(ctx)));

export { composer as start };
