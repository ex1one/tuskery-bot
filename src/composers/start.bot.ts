import { Composer, deunionize } from 'telegraf';

import { MyContext } from '../types/context';
import { MenuKeyboards } from '../keybords/menuKeyboards';

import prisma from '../../prisma';

const composer = new Composer<MyContext>();

const createUser = async ({ id, name }) => {
  const user = await prisma.user.findFirst({ where: { name } });
  const channel = await prisma.channel.findFirst({ where: { id } });

  if (channel) return;

  if (!user) {
    await prisma.user.create({ data: { name } });
  }

  await prisma.channel.create({ data: { id } });
};

composer.command('start', async (ctx) => {
  const { id, username } = deunionize(ctx.chat);

  await createUser({ id: Math.abs(id), name: username });

  await ctx.reply(ctx.i18next.t('information'), MenuKeyboards(ctx));
});

composer.command('menu', async (ctx) => await ctx.reply(ctx.i18next.t('information'), MenuKeyboards(ctx)));

composer.command('help', async (ctx) => await ctx.reply(ctx.i18next.t('information'), MenuKeyboards(ctx)));

export { composer as start };
