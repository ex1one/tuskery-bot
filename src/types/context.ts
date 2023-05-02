import { Context, Scenes } from 'telegraf';
import { Task } from '@prisma/client';
import { i18next } from 'telegraf-i18next';

export type MySession = Scenes.SceneSession & {
  tasks: Task[];
  locale: 'en' | 'ru';
};

export interface MyContext extends Context {
  tasks: Task[];
  session: MySession;
  i18next: typeof i18next;
  scene: Scenes.SceneContextScene<MyContext>;
}
