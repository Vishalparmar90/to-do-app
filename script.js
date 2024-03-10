document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    let editedTask = null;


    loadTasks();

    
    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const trimmedTask = taskInput.value.trim();
        if (editedTask) {
            editTask(editedTask, trimmedTask);
            editedTask = null;
        } else if (trimmedTask !== '') {
            addTask(trimmedTask);
        }
        taskInput.value = '';
    });

    
    function addTask(taskText) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${taskText}</span>
            <div class="actions">
                <span class="edit">✎</span>
                <span class="delete">X</span>
            </div>
        `;
        taskList.appendChild(li);

        // Save tasks to local storage
        saveTasks();

       
        const editButton = li.querySelector('.edit');
        editButton.addEventListener('click', function () {
            taskInput.value = li.querySelector('span:first-child').textContent;
            editedTask = li;
        });

 
        const deleteButton = li.querySelector('.delete');
        deleteButton.addEventListener('click', function () {
            li.remove();
            saveTasks();
        });
    }

   
    function editTask(taskElement, newText) {
        taskElement.querySelector('span:first-child').textContent = newText;
        saveTasks();
    }

   
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('li span:first-child').forEach((task) => {
            tasks.push(task.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach((task) => addTask(task));
    }
});
