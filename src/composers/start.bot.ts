import { Composer, deunionize } from 'telegraf';

import { MyContext } from '../types/context';
import { MenuKeyboards } from '../keybords/menuKeyboards';

import prisma from '../../prisma';

const composer = new Composer<MyContext>();

const createChat = async ({ id, username }) => {
  const chat = await prisma.chat.findFirst({ where: { id } });

  if (chat) return;

  await prisma.chat.create({ data: { username, id } });
};

composer.command('start', async (ctx) => {
  const { username, id } = deunionize(ctx.chat);

  await createChat({ id, username });

  await ctx.reply(ctx.i18next.t('information'), MenuKeyboards(ctx));
});

composer.command('menu', async (ctx) => await ctx.reply(ctx.i18next.t('information'), MenuKeyboards(ctx)));

composer.command('help', async (ctx) => await ctx.reply(ctx.i18next.t('information'), MenuKeyboards(ctx)));

export { composer as start };
