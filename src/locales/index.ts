const ru = {
  translation: {
    information:
      'Tuskery позволяет создавать задачи. Добавьте бота в группу, напишите @tuskery_bot [command]. Для получения списка своих задач напиши мне команду /list.\n\nОткрой детали задачи, нажав на ее номер в списке.\n\nЧтобы добавить задачу или посмотреть список текущих задач:\n1. Нажми кнопку 📋 Задачи, чтобы просмотреть список задач.\n2. Нажми кнопку ➕ Новая личная задача, чтобы добавить новую задачу.\n\nНажми на кнопку ❓ Справка, чтобы посмотреть полезную информацию о боте\n\nНажми кнопку ✅, чтобы отметить задачу как завершенную.',
    menuButtons: {
      settings: '⚙ Настройки',
      createTask: '➕ Новая задача',
      tasks: '📋 Задачи',
      help: '❓ Справка',
    },
    inlineButtons: {
      tasks: 'Задачи',
      switchLanguage: 'Сменить язык',
      prevPage: 'Предыдущая страница',
      nextPage: 'Следующая страница',
    },
    text: {
      task: 'Задача "{{ name }} {{ state }}"',
      completeTask: 'Задача помечана как завершённая',
      tasksList: '<b>Задачи</b>\n{{ textTasks }}',
      createNewTask: '/create Создание новой задачи',
      createNewTaskSuccess: `Задача {{ name }} успешно создана`,
      switchLanguage: 'Вы изменили язык',
      settings: `Текущий язык: {{ language }}`,
    },
  },
};

const en = {
  translation: {
    information:
      'Tuskery allows you to create tasks. Add the bot to the group, write @tuskery_bot [command]. To get a list of your tasks, write me the command /list\n\nOpen the details of the task by clicking on its number in the list.\n\nTo add a task or view a list of current tasks:\n1. Click the 📋 Tasks button to view the list of tasks.\n2. Click the ➕ New Personal Task button to add a new task.\n\nClick on the Help button to view useful information about the bot\n\nPress the ✅ button to mark the task as completed.',
    menuButtons: { settings: '⚙ Settings', createTask: '➕ New task', tasks: '📋 Tasks', help: '❓ Help' },
    inlineButtons: {
      tasks: 'Tasks',
      switchLanguage: 'Switch Language',
      prevPage: 'Prev Page',
      nextPage: 'Next Page',
    },
    text: {
      task: 'Task "{{ name }} {{ state }}"',
      completeTask: 'The task is marked as completed',
      tasksList: '<b>Tasks</b>\n{{ textTasks }}',
      createNewTask: '/create Create New Task',
      createNewTaskSuccess: `Task {{ name }} successfully created`,
      switchLanguage: 'You have changed the language',
      settings: `Current language: {{ language }}`,
    },
  },
};

export { ru, en };
