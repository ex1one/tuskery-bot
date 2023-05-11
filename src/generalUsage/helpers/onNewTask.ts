import { deunionize } from 'telegraf';
import { findCreateChat } from './findCreateChat';
import { getMessageLink } from './getMessageLink';
import { MyContext } from '../../types/context';
import _ from 'lodash';
import prisma from '../../../prisma';
import { tryExtractParams } from './tryExtractParams';

export async function onNewTask(ctx: MyContext) {
  const msg = deunionize(ctx.message)!;
  const text = msg?.text || ''; // text.startsWith('tuskery pls new')
  const lines = text.split('\n').map((e) => e.trim()).filter((e) => e).slice(1); // prettier-ignore
  const { assignee, name, tags } = extract(lines);

  const chat = await findCreateChat(msg.chat);

  const link = getMessageLink(ctx);
  const task = await prisma.task.create({
    data: {
      link,
      name,
      assignee,
      body: lines.join('\n'),
      channelId: `${chat.id}`,
      tags: {
        connectOrCreate: tags
          .map((t) => t.trim().toLowerCase())
          .map((name) => ({
            create: { name, channelId: chat.id },
            where: {
              channelId_name: {
                channelId: chat.id,
                name,
              },
            },
          })),
      },
    },
  });
  ctx.reply(`Task created: ${task.id}`);
}
function extract(lines: string[]) {
  const name = lines[0] || 'Untitled';
  let assignee = undefined as string | undefined;
  let tags = [] as string[];
  // https://regex101.com/r/lfVpBD/1
  const params = lines.find((line) => /^((?:^| )+-\w+ [^-\n]+(?!-))+$/.exec(line));

  if (params) {
    const pars = _(` ${params} `.split(' -'))
      .map((onePar) => {
        const parts = onePar.trim().split(' ');
        return {
          par: parts[0]?.toLowerCase().trim() || '',
          val: parts.slice(1).join(' '),
        };
      })
      .filter((e) => !!e.par)
      .keyBy((e) => e.par)
      .mapValues((e) => e.val)
      .value();
    if (pars['a']) assignee = pars['a'];
    if (pars['t'])
            tags = pars['t'].split(',').map(e => e.trim()).filter(e => e); // prettier-ignore
  }

  return { name, tags, assignee };
}
