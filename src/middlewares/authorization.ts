import { deunionize } from 'telegraf';

import prisma from '../../prisma';

export const authorization = async (ctx, next) => {
  const { id } = deunionize(ctx.chat);

  const channel = await prisma.channel.findFirst({ where: { id: `${id}` } });

  if (channel) return next();

  const newChannel = await prisma.channel.create({ data: { id: `${id}` } });

  if (newChannel) next();
};
