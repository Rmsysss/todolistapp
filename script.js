const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const completed = document.getElementById('todo-completed');

// Load tasks from localStorage
const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
let tasks = storedTasks;

function save_tasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function createTaskElement(task, index) {
    const li = document.createElement('li');
    li.className = 'todo-item';

    const chkboxGrp = document.createElement('div');
    chkboxGrp.className = 'chkbx-grp';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;

    const label = document.createElement('label');
    label.textContent = " " + task.text;

    const buttonGrp = document.createElement('div');
    buttonGrp.className = 'button-group';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'optionBtn';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'optionBtn';

    chkboxGrp.appendChild(checkbox);
    chkboxGrp.appendChild(label);
    li.appendChild(chkboxGrp);
    buttonGrp.appendChild(deleteBtn);
    buttonGrp.appendChild(editBtn);
    li.appendChild(buttonGrp);

    if (task.completed) {
        completed.appendChild(li);
        checkbox.disabled = true;
        editBtn.remove();
    } else {
        list.appendChild(li);
    }

    // ✅ Checkbox handler
    checkbox.addEventListener('change', function () {
        if (this.checked) {
            task.completed = true;
            save_tasks();
            completed.appendChild(li);
            this.disabled = true;
            editBtn.remove();
        }
    });

    // ✅ Delete handler
    deleteBtn.addEventListener('click', function () {
        tasks.splice(index, 1); // remove from array
        save_tasks();
        li.remove();
    });

    // ✅ Edit handler
    editBtn.addEventListener('click', function () {
        const newText = prompt('Edit your task:', label.textContent.trim());
        if (newText !== null && newText.trim() !== '') {
            label.textContent = ' ' + newText;
            task.text = newText.trim();
            save_tasks();
        }
    });
}

tasks.forEach((task, index) => {
    createTaskElement(task, index);
});

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const taskText = input.value.trim();
    if (taskText === '') return;

    const newTask = { text: taskText, completed: false };
    tasks.push(newTask);
    save_tasks();

    createTaskElement(newTask, tasks.length - 1);
    input.value = '';
});
