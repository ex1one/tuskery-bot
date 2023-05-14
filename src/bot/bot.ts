import { session } from 'telegraf';
import * as dotenv from 'dotenv';

// Composers
import { start } from '../composers/start.bot';
import { tasks } from '../composers/tasks';
import { task } from '../composers/task';
import { language } from '../composers/language';
import { showAvailableCommands } from '../composers/showAvailableCommands';

// Stage
import { stages } from '../scenes/stage';

// Listeners
import { listeners } from '../listeners/inlineMenuButtons';

// Middlewares
import { authorization } from '../middlewares/authorization';
import { setupBot } from './setupBot';

dotenv.config({ path: '../../.env' });

const bot = setupBot(process.env.environment);

// Middlewares
bot.use(session({ defaultSession: () => ({ locale: 'ru' }) }));
bot.use(language);
bot.use(stages);
bot.use((ctx, next) => authorization(ctx, next));

// Composers
bot.use(start);
bot.use(listeners);
bot.use(tasks);
bot.use(task);
bot.use(showAvailableCommands);

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
