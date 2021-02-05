//DOCUMENT SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

//LISTENERS
todoButton.addEventListener("click", addTodo);

//FUNCTIONS
function addTodo(event){
    //DISABLE SUBMIT
    event.preventDefault();
    //CREATE DIV AND ADD CLASS TODO
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //CREATE LIST
    const newTodo = document.createElement('li');
    newTodo.innertext = 'hello';
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //CHECKMARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //DELETE BUTTON
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("complete-btn"); //trash btn?
    todoDiv.appendChild(deleteButton);
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
}