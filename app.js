//TO DO
//EFFEKTIVISERA KODEN
//LÄGG TILL ANIMATION NÄR MAN SKAPAR EN NY TODO

//LÄGG TILL EN DAILY TASKS / WEEKLY TASKS 
//LÄGG EVENTUELLT TILL ETT SCHEMA

//DOCUMENT SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//LISTENERS
todoButton.addEventListener("click", (e)=>{
    if(filterOption.value === "all")
    {
        addTodo();
    }
});
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("input", filterTodo);


//FUNCTIONS
function addTodo(){
    //CREATE DIV AND ADD CLASS TODO
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //CREATE LIST
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
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
    deleteButton.classList.add("delete-btn"); 
    todoDiv.appendChild(deleteButton);
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
    //CLEAR INPUT VALUE
    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;
    //DELETE TODO
    if(item.classList[0] === "delete-btn")
    {
        const todo = item.parentElement; 
        //REMOVE AFTER ANIMATION
        todo.classList.add("removed");
        todo.addEventListener("transitionend", function(){
            todo.remove(); 
        });
    }

    //CHECK TODO
    if(item.classList[0] === "complete-btn"){ 
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;
        }
    });
    
}