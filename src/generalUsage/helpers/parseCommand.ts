import _ from 'lodash';
import { deunionize } from 'telegraf';
import { Command } from './onListCommand';
import { MyContext } from '../../types/context';
import { tryExtractParams } from './tryExtractParams';
import { findCreateChat } from './findCreateChat';

const re = /^tuskery pls (\w+)(\s|$)/i;

export async function parseCommand(ctx: MyContext) {
  const msg = deunionize(ctx.message)!;
  const text = msg?.text?.trim() || '';

  let lines = text.split('\n');

  const firstLine = lines[0]?.trim() || '';
  if (!re.test(firstLine)) return undefined;

  lines = text.split('\n').map((e) => e.trim()).filter((e) => e).slice(1); // prettier-ignore
  let params: { [key: string]: string } = {};
  {
    const otherPars = firstLine.replace(re, '').trim();
    const nextPossibleParamsLine = lines.find((e) => !!e.trim()); // if we dont find params right after command we try next non-empty line also
    if (otherPars) {
      const extracted = tryExtractParams(otherPars);
      if (extracted) params = extracted;
      else {
        params = _(otherPars.split(' ').filter((e) => e))
          .keyBy((e) => e)
          .mapValues(() => 'true')
          .value();
      }
      // else lines = [otherPars, ...lines]
    }
    if (!Object.keys(params)) params = tryExtractParams(nextPossibleParamsLine || '') || {};
  }

  const c: Command = {
    channel: await findCreateChat(msg.chat),
    type: re.exec(firstLine)?.[1] || (firstLine as any),
    ctx,
    notation: 'kind',
    text: lines.slice(1).join('\n'),
    params,
  };

  return c;
}
