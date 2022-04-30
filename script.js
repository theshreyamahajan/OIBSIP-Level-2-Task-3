let addbtn = document.querySelector('#addbtn');
let currTaskinput = document.querySelector('#inputtask')
let tasks = document.querySelector('.tasks');
let todos = []

getFromLocalStorage();

addbtn.addEventListener('click',(e)=>{
    if (tasks.children.className == "emptyMsg") {
        tasks.children.remove()
    }
    const todo = {
        id: Date.now(),
        name: currTaskinput.value
    };
    todos.push(todo)
    addToLocalStorage(todos)   
    currTaskinput.value = '' 
})

function addToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos(todos);
}

function renderTodos(todos) {
    tasks.innerHTML = '';

    if(todos.length == 0){
        tasks.innerHTML = `<h3 class="emptyMsg">No tasks here.</h3>`;
    }

    todos.forEach(function(item) {
        
        let newdiv = document.createElement('div');
        newdiv.setAttribute('class', 'item');
        newdiv.setAttribute('data-key', item.id);
        newdiv.className = 'task list-group-item d-flex justify-content-between'
        newdiv.innerHTML = `<span class="flex-grow-1">${item.name}</span>
        <button class="edit" onclick='editTask(this)'>Edit</button>
        <button class="delete" onclick='deleteTask(this)'>Delete</button>`

        tasks.appendChild(newdiv)
    });
}

function getFromLocalStorage() {
  const reference = localStorage.getItem('todos');
  if (reference) {
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}

function deleteTask(e){
    
    let id  = e.parentElement.getAttribute('data-key');
    todos = todos.filter(function(item) {
        return item.id != id;
    });
    addToLocalStorage(todos);
}


function editTask(e){
    if (e.textContent == "Done") {
        e.textContent = "Edit"
        let currChapterName = e.previousElementSibling.value
        let currHeading = document.createElement('span');
        currHeading.className = "flex-grow-1"
        currHeading.textContent = currChapterName
        e.parentElement.replaceChild(currHeading, e.previousElementSibling)

        let idd = currHeading.parentElement.getAttribute('data-key');
        todos.forEach(task => {
            if ( idd == task.id ){
                task.name = currChapterName
            }
        });
        addToLocalStorage(todos)

    } else {
        e.textContent = "Done"
        let currChapterName = e.previousElementSibling.textContent
        let currInput = document.createElement('input');
        currInput.type = "text"
        currInput.placeholder = "Enter Task"
        currInput.value = currChapterName
        e.parentElement.replaceChild(currInput, e.previousElementSibling)
    }

}
