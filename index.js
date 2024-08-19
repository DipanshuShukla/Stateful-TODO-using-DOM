let todoID = 0;
let todos = [];

function addTodo() {
    todoID++;
    const input = document.querySelector("input");
    const todoItem = input.value;

    if (!todoItem) return;

    todos.push({
        id: todoID,
        text: todoItem,
    });

    input.value = "";
    render();
    persist();
}

function render() {
    const todoOL = document.querySelector("ol");
    todoOL.innerHTML =
        todos.length === 0
            ? "<li class='nothing'>Nothing to do here. Start by adding a TODO.</li>"
            : "";

    todos.forEach((todoItem) => {
        const todo = document.createElement("li");
        const text = document.createElement("span");
        text.innerText = todoItem.text;

        const btn = document.createElement("button");
        btn.setAttribute("onclick", `deleteTodo(${todoItem.id})`);
        btn.innerHTML = '<i class="fa fa-trash"></i> ';

        todo.appendChild(text);
        todo.appendChild(btn);

        todoOL.appendChild(todo);
    });
}

function deleteTodo(id) {
    todos = todos.filter((td) => td.id !== id);
    render();
    persist();
}

function persist() {
    localStorage.setItem("DOM-todo-app-todos", JSON.stringify(todos));
    localStorage.setItem("DOM-todo-app-todoID", todoID);
}

function init() {
    const savedTodos = localStorage.getItem("DOM-todo-app-todos");
    todos = savedTodos ? JSON.parse(savedTodos) : [];
    todoID = todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) : 0;
    render();
}

document.addEventListener("DOMContentLoaded", function () {
    init();
});
