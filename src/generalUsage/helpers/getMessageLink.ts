import { MyContext } from '../../types/context';

export function getMessageLink(ctx: MyContext) {
  const chatIdFull = ctx.chat?.id.toString();

  if (chatIdFull?.slice(0, 4) != '-100') return undefined; // Why

  const msg = ctx.message;
  const cId = chatIdFull.slice(4) || chatIdFull;

  return `https://t.me/c/${cId}/${msg.message_id}`;
}
