const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const completed = document.getElementById('todo-completed');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const taskText = input.value.trim();
    if (taskText === '') return;
    
    const li = document.createElement('li');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const label = document.createElement('label');
    label.textContent = " " + taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';

    li.appendChild(checkbox);
    li.appendChild(label);

    li.appendChild(deleteBtn);
    li.appendChild(editBtn);

    list.appendChild(li);

    input.value = '';

    checkbox.addEventListener('change', function() {
        if (this.checked) {
            completed.appendChild(li);
            this.disabled = true;
            editBtn.remove();
        }
    });

    deleteBtn.addEventListener('click', function () {
        li.remove();
    });

    editBtn.addEventListener('click', function(){
        const newText = prompt('Edit your task:', label.textContent.trim());
        if (newText !== null && newText.trim() !== ''){
            label.textContent = ' ' + newText;
        }
    });
});