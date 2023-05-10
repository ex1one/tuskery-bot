import { findCreateChat } from './findCreateChat';

import { Channel, Task, Tag } from '@prisma/client';
import prisma from '../../../prisma';
import { MyContext } from '../../types/context';

export type Command = {
  type: 'new' | 'tags' | 'resolve' | 'list';
  channel: Channel;
  text?: string;
  params?: { [key: string]: string };
  notation?: 'kind';
  ctx?: MyContext;
};

export async function onListCommand(ctx: MyContext, cmd: Command) {
  const chat = await findCreateChat(ctx.message!.chat);
  const tasks = await prisma.task.findMany({
    where: { OR: [{ state: { not: 'RESOLVED' } }, { state: null }], channelId: chat.id },
    include: { tags: true },
    orderBy: { createdAt: 'asc' },
  });

  const mode = cmd.params?.full !== undefined ? 'full' : '';

  const resStr = tasks.map((t) => taskToString(t, t.tags, mode)).join('\n');
  ctx.reply('All tasks: \n\n' + resStr);
}

function taskToString(t: Task, tags: Tag[], mode = '') {
  const assignee = t.assignee ? ` ${t.assignee})` : '';

  const tagsStr = tags.length ? ` [${tags.map((t) => t.name).join(', ')}]` : '';

  if (mode == 'full') {
    const firstRow = `#${t.id} ${t.name} (${fromNowPro(t.createdAt)})`;
    // let second = t.link

    const addStr = (str: string | null) => (str ? str + '\n' : '');

    return `${firstRow}\n${addStr(t.link)}${addStr(`${t.assignee || ''}${tagsStr}`.trim())}`;
  }
  return `#${t.id} ${t.name}${assignee}${tagsStr} (${fromNowPro(t.createdAt)})`;
}

// 1. Set up SSL (@dtx) [asd, qwe, asd]
export function fromNowPro(d: Date) {
  const res = /.*?[A-Za-z]/.exec('17 mon')?.[0] || '';
  if (!res) return 'u dead';
  return res;
}
