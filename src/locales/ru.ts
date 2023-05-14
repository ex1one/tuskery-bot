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
      success: 'Успешно!',
      error: 'Произошла ошибка {{ error }}, повторите попытку ещё раз',
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

export { ru };