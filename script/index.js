const todoForm = document.querySelector('form')
const todoInput = document.getElementById('to-do-input')
const todoUl = document.getElementById('to-do-list')

todoForm.addEventListener('submit', event => {
    event.preventDefault();
    addTodo();
})

const addTodo = () => {
    const todoText = todoInput.value.trim();
    todoArray.push(todoText);
    saveTodos();
    renderList();
    todoInput.value = '';
}

const renderList = () => {
    todoUl.innerHTML = "";
    todoArray.forEach((todo, todoIndex) => {
        const listItem = createListItem(todo, todoIndex);
        todoUl.appendChild(listItem);
    })
}

const createListItem = (todo, todoIndex) => {
    const listItem = document.createElement('li');
    listItem.className = 'to-do'
    listItem.innerHTML = `
        <input id="to-do-${todoIndex}" type="checkbox">
        <label for="to-do-${todoIndex}" class="custom-checkbox">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
        </label>
        <label for="to-do-${todoIndex}" class="to-do-text">
            ${todo}
        </label>
        <button class="delete-button">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
        </button>
    `
    const deleteButton = listItem.querySelector('.delete-button')
    deleteButton.addEventListener('click', () => {
        deleteTodo(todoIndex)
    })
    return listItem;
}

function deleteTodo(todoIndex) {
    todoArray = todoArray.filter((_, i) => i != todoIndex)
    saveTodos();
    renderList();
}

function saveTodos() {
    const jsonTodoArray = JSON.stringify(todoArray);
    localStorage.setItem("todo", jsonTodoArray);
}

function loadTodos() {
    const savedTodos = localStorage.getItem('todo');
    if (savedTodos)
        return JSON.parse(savedTodos);
    return [];
}

let todoArray = loadTodos();
if (todoArray)
    renderList();
