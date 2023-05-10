import { MyContext } from '../../types/context';
import { findCreateChat } from './findCreateChat';
import prisma from '../../../prisma';
import _ from 'lodash';

export async function onTagsCommand(ctx: MyContext) {
  const chat = await findCreateChat(ctx.message!.chat);
  const tags = await prisma.tag.findMany({
    where: { channel: chat },
    include: { _count: { select: { tasks: true } } },
  });

  const tagsStr = _(tags)
    .orderBy((e) => -e._count.tasks)
    .map((t) => `${t._count.tasks} - ${t.name}`)
    .join('\n');
  await ctx.reply(`Tags:\n${tagsStr}`);
}
