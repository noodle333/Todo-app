//DOCUMENT SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");


//LISTENERS
document.addEventListener('DOMContentLoaded', refreshTodos); //OM HEMSIDAN UPPDATERAS KÖR FUNKTIONEN SOM LÄGGER TILL LOCAL STORAGE TODOS
todoButton.addEventListener("click", (e) => {
    if(filterOption.value === "all")
    {
        addTodo();
    }
});
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("input", filterTodo);


//FUNCTIONS
function addTodo(){
    //SKAPA DIV OCH LÄGG TILL KLASSEN TODO
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //SKAPA LISTA
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //LÄGG TILL TODO TILL LOCALSTORAGE
    saveLocalStorage(todoInput.value);
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
    //APPENDA TILL LISTAN
    todoList.appendChild(todoDiv);
    //RENSA DET ANVÄNDAREN HAR SKRIVIT IN INNAN
    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;
    //TA BORT TODO
    if(item.classList[0] === "delete-btn")
    {
        const todo = item.parentElement; 
        //VÄNTA TILL CSS ANIMATIONENS SLUT SEN TA BORT TODO
        todo.classList.add("removed");
        //NÄR KLASSEN REMOVED LAGTS TILL TA BORT FÖREMÅLET FRÅN LOCAL STORAGE
        removeLocalStorage(todo);
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
        //KOLLA LÄGENA FÖR ALLA 3 ALTERNATIV OCH DÖLJ/VISA BEROENDE PÅ VILKEN SOM ÄR VALD
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

function saveLocalStorage(todo) {
    //KOLLA OM MAN HAR EN TODO ARRAY 
    let todos;
    if (localStorage.getItem('todos') === null)
    {
        todos = []; //SKAPA EN TOM ARRAY OM MAN INTE REDAN HAR EN
    }
    else 
    {
        todos = JSON.parse(localStorage.getItem('todos')); //TA FRAM TODO ARRAYEN
    }   
    todos.push(todo); // PUSHA TILL ARRAY
    localStorage.setItem('todos', JSON.stringify(todos)); //SÄTT IN DEN I LOCAL STORAGE TROR JAG?
}

function removeLocalStorage(todo) {
    let todos;
    if (localStorage.getItem('todos') === null)
    {
        todos = [];
    }
    else
    {
        todos = JSON.parse(localStorage.getItem('todos')); 
    }
    const todoIndex = todo.children[0].innerText; //TA FRAM VILKET FÖREMÅL I ARRAYEN SOM SKA TAS BORT VIA TEXTEN
    todos.splice(todos.indexOf(todoIndex), 1); //TA BORT VALT FÖREMÅL (1)
    localStorage.setItem('todos', JSON.stringify(todos));
}

function refreshTodos() {
    let todos;
    if (localStorage.getItem('todos') === null)
    {
        todos = []; 
    }
    else 
    {
        todos = JSON.parse(localStorage.getItem('todos')); //TA FRAM TODO ARRAYEN
    }  
    //FÖR VARJE TODO INOM LOCAL STORAGE ARRAYEN SÅ UPPREPAR VI KODEN SOM LÄGGER TILL EN NY TODO
    todos.forEach(function(todo){
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
    
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add("delete-btn"); 
        todoDiv.appendChild(deleteButton);
        todoList.appendChild(todoDiv);
    })
}