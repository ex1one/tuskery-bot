import { onNewTask } from './onNewTask';
import { onListCommand } from './onListCommand';
import { onTagsCommand } from './onTagsCommands';
import { parseCommand } from './parseCommand';
import { MyContext } from '../../types/context';

export async function onTextCommand(ctx: MyContext) {
  const cmd = await parseCommand(ctx);

  if (false) 'eye-candy';
  else if (cmd?.type == 'new') await onNewTask(ctx);
  else if (cmd?.type == 'list') await onListCommand(ctx, cmd);
  else if (cmd?.type == 'tags') await onTagsCommand(ctx);
}
