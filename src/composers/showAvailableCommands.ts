import { Composer } from 'telegraf';
import { MyContext } from '../types/context';

const composer = new Composer<MyContext>();

const actions = [
  {
    title: '❓ Справка',
    description: 'Информация о боте',
    message_text: '/help',
  },
  {
    title: '📋 Задачи',
    description: 'Список поставленных задач',
    message_text: '/list',
  },
  {
    title: '➕ Новая задача',
    description: 'Создание новой задачи',
    message_text: '/create',
  },
];

composer.on('inline_query', async (ctx) => {
  // Получаем запрос пользователя
  const query = ctx.inlineQuery.query;

  if (query) {
    // Отправляем ответ пользователю
    await ctx.answerInlineQuery(
      actions.map((action, index) => ({
        type: 'article',
        id: `${index}`,
        title: action.title,
        description: action.description,
        input_message_content: {
          message_text: action.message_text,
        },
      })),
    );
  }
});

export { composer as showAvailableCommands };
