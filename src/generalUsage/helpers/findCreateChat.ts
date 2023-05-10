import { Chat } from 'telegraf/typings/core/types/typegram';
import prisma from '../../../prisma';

export async function findCreateChat(c: Chat.PrivateChat | Chat.SupergroupChat | Chat.GroupChat) {
  let chat = await prisma.channel.findFirst({ where: { id: c.id } });
  if (!chat)
    chat = await prisma.channel.create({
      data: {
        id: c.id,
        name: (c as any).title || `${c.type} ${c.id}`,
      },
    });

  return chat;
}
