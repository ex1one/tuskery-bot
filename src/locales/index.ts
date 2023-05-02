const ru = {
  translation: {
    information: `Tuskery позволяет создавать совместные задачи. В чате с собеседником напиши @tuskery {задача} и нажми Создать задачу. После подтверждения собеседником будет создана общая задача. Для получения списка своих задач напиши мне команду /list. Перешли сюда сообщение, чтобы создать личную задачу.

Открой детали задачи, нажав на ее номер в списке.

Чтобы добавить задачу или посмотреть список текущих задач:
1. Нажми кнопку 📋 Задачи, чтобы просмотреть список задач.
2. Нажми кнопку ➕ Новая личная задача, чтобы добавить новую задачу.

Нажми на кнопку ❓ Справка, чтобы посмотреть полезную информацию о боте

Нажми кнопку ✅, чтобы отметить задачу как завершенную.`,
    menuButtons: {
      settings: '⚙ Настройки',
      personalTask: '➕ Новая личная задача',
      tasks: '📋 Задачи',
      help: '❓ Справка',
    },
    inlineButtons: {
      personalTasks: 'Личные задачи',
      switchLanguage: 'Сменить язык',
      prevPage: 'Предыдущая страница',
      nextPage: 'Следующая страница',
      chatList: 'Список чатов',
    },
    text: {
      chat: 'Чаты',
      task: 'Задача "{{ name }}"',
      completeTask: 'Задача помечана как завершённая',
      tasksList: 'Чат: <b>Личные задачи</b>\n{{ textTasks }}',
      createNewTask: '/create Создание новой задачи',
      createNewTaskSuccess: `Задача {{ name }} успешно создана`,
      switchLanguage: 'Вы изменили язык',
      settings: `Текущий язык: {{ language }}`,
    },
  },
};

const en = {
  translation: {
    information: `Tuskery allows you to create collaborative tasks. In the chat with the interlocutor, write @tuskery {task} and click Create task. After confirmation by the interlocutor, a common task will be created. To get a list of your tasks, write me the command /list. Send a message here to create a personal task.

Open the details of the task by clicking on its number in the list.

To add a task or view a list of current tasks:
1. Click the 📋 Tasks button to view the list of tasks.
2. Click the ➕ New Personal Task button to add a new task.

Click on the Help button to view useful information about the bot

Press the ✅ button to mark the task as completed.`,
    menuButtons: { settings: '⚙ Settings', personalTask: '➕ New personal task', tasks: '📋 Tasks', help: '❓ Help' },
    inlineButtons: {
      personalTasks: 'Personal tasks',
      switchLanguage: 'Switch Language',
      prevPage: 'Prev Page',
      nextPage: 'Next Page',
      chatList: 'List of chats',
    },
    text: {
      chat: 'Chats with tasks',
      task: 'Task "{{ name }}"',
      completeTask: 'The task is marked as completed',
      tasksList: 'Chat: <b>Personal tasks</b>\n{{ textTasks }}',
      createNewTask: '/create Create New Task',
      createNewTaskSuccess: `Task {{ name }} successfully created`,
      switchLanguage: 'You have changed the language',
      settings: `Current language: {{ language }}`,
    },
  },
};

export { ru, en };
