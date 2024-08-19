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
}

function render() {
    const todoOL = document.querySelector("ol");
    todoOL.innerHTML =
        todos.length === 0
            ? "<li class='nothing'>Nothing to do here. Start by adding a TODO.</li>"
            : "";

    todos.forEach((todoItem, i) => {
        const todo = document.createElement("li");
        const text = document.createElement("span");
        text.innerText = `${i + 1}.  ` + todoItem.text;

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
}
