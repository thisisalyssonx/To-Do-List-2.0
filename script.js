document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const taskDateInput = document.getElementById('task-date');
    const taskList = document.getElementById('task-list');
    const addTaskButton = document.getElementById('add-task');
    const lightThemeButton = document.getElementById('light-theme');
    const darkThemeButton = document.getElementById('dark-theme');

    
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTaskToDOM(task.text, task.date, task.completed);
        });
    };

    
    const saveTasks = () => {
        const tasks = Array.from(taskList.children).map(li => ({
            text: li.querySelector('.task-text').textContent,
            date: li.querySelector('.task-date').textContent,
            completed: li.classList.contains('completed')
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

   
    const setTheme = (theme) => {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        localStorage.setItem('theme', theme);
    };

    
    const loadTheme = () => {
        const theme = localStorage.getItem('theme') || 'light';
        setTheme(theme);
    };

    
    const addTaskToDOM = (taskText, taskDate, completed = false) => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.classList.add('task-text');
        span.textContent = taskText;

        const dateSpan = document.createElement('span');
        dateSpan.classList.add('task-date');

        if (taskDate) {
            const [year, month, day] = taskDate.split('-');
            dateSpan.textContent = ` (Até: ${day}/${month}/${year})`;
        }

        li.appendChild(span);
        li.appendChild(dateSpan);

        const completeButton = document.createElement('button');
        completeButton.textContent = '✔️';
        completeButton.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '🗑️';
        deleteButton.addEventListener('click', () => {
            li.remove();
            saveTasks();
        });

        li.appendChild(completeButton);
        li.appendChild(deleteButton);

        if (completed) {
            li.classList.add('completed');
        }

        taskList.appendChild(li);
    };

    
    const addTask = () => {
        const taskText = taskInput.value.trim();
        const taskDate = taskDateInput.value;

        if (taskText !== '') {
            addTaskToDOM(taskText, taskDate);
            taskInput.value = '';
            taskDateInput.value = '';
            saveTasks();
        }
    };

    
    addTaskButton.addEventListener('click', () => {
        if (!taskDateInput.value) {
            taskDateInput.style.display = 'block';
        } else {
            addTask();
            taskDateInput.style.display = 'none';
        }
    });

    lightThemeButton.addEventListener('click', () => setTheme('light'));
    darkThemeButton.addEventListener('click', () => setTheme('dark'));

    loadTasks();
    loadTheme();
});
