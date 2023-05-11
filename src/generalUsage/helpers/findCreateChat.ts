import prisma from '../../../prisma';

export async function findCreateChat(c) {
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
