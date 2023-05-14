import { Composer, Scenes } from 'telegraf';

import { MyContext } from '../types/context';

// Scenes
import { createTask } from './createTask';

const scenes = new Scenes.Stage<MyContext>([createTask]);

// CreateTaskScene
scenes.command('create', (ctx) => ctx.scene.enter('createTaskScene'));
scenes.action('createTask', async (ctx) => {
  await ctx.scene.enter('createTaskScene');

  await ctx.answerCbQuery();
});

const stages = new Composer<MyContext>();

stages.use(scenes);

export { stages };
