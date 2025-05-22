// DOM Elements
let todoWidgetEl;
let todoListEl;
let newTaskInputEl;
let addTaskButtonEl;

/**
 * Loads tasks from chrome.storage.local.
 * @param {function(Array<{id: number, text: string, completed: boolean}>)} callback - Called with the array of tasks.
 */
function loadTasks(callback) {
  chrome.storage.local.get(['tasks'], (result) => {
    if (chrome.runtime.lastError) {
      console.error('Error loading tasks:', chrome.runtime.lastError);
      callback([]);
    } else {
      callback(result.tasks || []);
    }
  });
}

/**
 * Saves tasks to chrome.storage.local.
 * @param {Array<{id: number, text: string, completed: boolean}>} tasks - The array of tasks to save.
 */
function saveTasks(tasks) {
  chrome.storage.local.set({ tasks: tasks }, () => {
    if (chrome.runtime.lastError) {
      console.error('Error saving tasks:', chrome.runtime.lastError);
    } else {
      // console.log('Tasks saved successfully.');
    }
  });
}

/**
 * Toggles the completion status of a task.
 * @param {number} taskId - The ID of the task to toggle.
 */
function toggleTaskComplete(taskId) {
  loadTasks((tasks) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    saveTasks(updatedTasks);
    renderTasks(updatedTasks);
  });
}

/**
 * Deletes a task by its ID.
 * @param {number} taskId - The ID of the task to delete.
 */
function deleteTask(taskId) {
  loadTasks((tasks) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    saveTasks(updatedTasks);
    renderTasks(updatedTasks);
  });
}

/**
 * Renders the tasks in the to-do list.
 * @param {Array<{id: number, text: string, completed: boolean}>} tasksArray - The array of tasks to render.
 */
function renderTasks(tasksArray) {
  if (!todoListEl) return;

  todoListEl.innerHTML = ''; // Clear existing tasks

  if (tasksArray && tasksArray.length > 0) {
    tasksArray.forEach(task => {
      const taskItem = document.createElement('div');
      taskItem.classList.add('task-item');
      taskItem.setAttribute('data-id', task.id);

      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.classList.add('task-checkbox');
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', () => {
        toggleTaskComplete(task.id);
      });

      const taskText = document.createElement('span');
      taskText.classList.add('task-text');
      taskText.textContent = task.text;
      if (task.completed) {
        taskText.classList.add('completed');
      }

      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-task-button');
      // Using Material Icon for delete, consistent with notes widget
      deleteButton.innerHTML = '<i class="material-icons-round" style="font-size: 18px;">delete</i>';
      deleteButton.setAttribute('title', 'Delete task');
      deleteButton.addEventListener('click', () => {
        deleteTask(task.id);
      });

      taskItem.appendChild(checkbox);
      taskItem.appendChild(taskText);
      taskItem.appendChild(deleteButton);
      todoListEl.appendChild(taskItem);
    });
  } else {
    // Optional: Display a message if there are no tasks
    // const emptyMessage = document.createElement('p');
    // emptyMessage.textContent = 'No tasks yet. Add one below!';
    // emptyMessage.style.textAlign = 'center';
    // emptyMessage.style.opacity = '0.7';
    // todoListEl.appendChild(emptyMessage);
  }
}

/**
 * Adds a new task from the input field.
 */
function addTask() {
  if (!newTaskInputEl || !newTaskInputEl.value.trim()) {
    if (newTaskInputEl) newTaskInputEl.focus();
    return;
  }

  const newTaskText = newTaskInputEl.value.trim();
  const newTask = {
    id: Date.now(), // Simple unique ID
    text: newTaskText,
    completed: false,
  };

  loadTasks((tasks) => {
    const updatedTasks = [...tasks, newTask];
    saveTasks(updatedTasks);
    renderTasks(updatedTasks);
    newTaskInputEl.value = ''; // Clear input field
    newTaskInputEl.focus();
  });
}

/**
 * Initializes the To-Do Widget.
 */
function initTodoWidget() {
  todoWidgetEl = document.getElementById('todo-widget');
  todoListEl = document.getElementById('todo-list');
  newTaskInputEl = document.getElementById('new-task-input');
  addTaskButtonEl = document.getElementById('add-task-button');

  if (!todoWidgetEl || !todoListEl || !newTaskInputEl || !addTaskButtonEl) {
    console.warn('To-Do widget DOM elements not found. Skipping initialization.');
    return;
  }

  addTaskButtonEl.addEventListener('click', addTask);
  newTaskInputEl.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // Load and render existing tasks
  loadTasks((tasks) => {
    renderTasks(tasks);
  });

  // console.log('To-Do widget initialized.');
}

export { initTodoWidget };
