import { Composer, deunionize } from 'telegraf';

import { MyContext } from '../types/context';
import { MenuKeyboards } from '../keybords/menuKeyboards';

import prisma from '../../prisma';

const composer = new Composer<MyContext>();

const createChannel = async ({ id, name }) => {
  const channel = await prisma.channel.findFirst({ where: { id, name } });

  if (channel) return;

  await prisma.channel.create({ data: { id, name } });
};

composer.command('start', async (ctx) => {
  const { id, username } = deunionize(ctx.chat);

  await createChannel({ id: `${id}`, name: username });

  await ctx.reply(ctx.i18next.t('information'), MenuKeyboards(ctx));
});

composer.command('menu', async (ctx) => await ctx.reply(ctx.i18next.t('information'), MenuKeyboards(ctx)));

composer.command('help', async (ctx) => await ctx.reply(ctx.i18next.t('information'), MenuKeyboards(ctx)));

export { composer as start };
