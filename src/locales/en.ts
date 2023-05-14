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
      success: 'Success!',
      error: 'An error has occurred {{ error }}, please try again',
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

export { en };
