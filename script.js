const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const completed = document.getElementById('todo-completed');

function add_to_do() {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
    
        const taskText = input.value.trim();
        if (taskText === '') return;
        
        const li = document.createElement('li');
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
    
        const label = document.createElement('label');
        label.textContent = " " + taskText;
    
        li.appendChild(checkbox);
        li.appendChild(label);
    
        list.appendChild(li);
    
        input.value = '';

        checkbox.addEventListener('change', function() {
            if (this.checked) {
                completed.appendChild(li);
            } else {
                list.appendChild(li);
            }
        });
    });
}