export const getTasksText = (tasks) => {
  let textTasks = '';

  for (let i = 0; i < tasks.length; i++) {
    textTasks = textTasks + `${i + 1}. ${tasks[i]?.name}\n`;
  }

  return { textTasks };
};
