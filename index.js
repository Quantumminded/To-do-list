
const form = document.getElementById('new-todo-form');
const input = document.querySelector('#new-todo-form input');
const categoryOne = document.querySelector('#category1');
const categoryTwo = document.querySelector('#category2');
let category = '';



window.addEventListener("load", () => {
  //todos = JSON.parse(localStorage.getItem("todos")) || [];
  nameInput = document.querySelector("#name");
  //const form = document.querySelector("#new-todo-form");

  const username = localStorage.getItem("username") || "";
  nameInput.value = username;

  nameInput.addEventListener("change", (e) => {
    localStorage.setItem("username", e.target.value);
  });

  loadAll();
});


categoryOne.addEventListener('click', (e) => {
  category = e.target.value;
});

categoryTwo.addEventListener('click', (e) => {
  category = e.target.value;
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!input.value) {
    return '';
  }
  addTodoList(category, input.value);
  category = '';
  const content = document.querySelector("#content");

  content.value = "";
})

const loadAll = () => {
  for (const [key, value] of Object.entries(localStorage)) {
    if (value[0] !== '{') {
      continue;
    } 
    let todoParams = JSON.parse(value);
    let todo = createTodo(todoParams.id, todoParams.category, todoParams.value, todoParams.checked)
    document.querySelector('#todo-list').innerHTML += todo;
   
  }

}



//ADD TODO ITEM TO THE LIST
//FORM ID new-todo-form 
function addTodoList(category, value) {

  let id = Date.now();
  let newTodo = createTodo(id, category, value, 'unchecked');
  localStorage.setItem(id, JSON.stringify({ id: id, category: category, value: value, checked: 'unchecked' }))
  document.querySelector('#todo-list').innerHTML += newTodo;
}

function createTodo(id, category, value, checked) {

  return `<div class='todo-item' id='${id}'>
  <label>
    <input id="checkbox" type='checkbox' class='checkbox_input' onclick="setChecked(this)" ${checked}/>
    <span class='check ${category}'></span>
  </label>
  <div class='todo-content'>
    <input type="textarea" value='${value}' onkeydown="stopEdit(this)" readonly="true""/>
  </div>
  <div class='actions'>
    <button class='edit' onclick="editTodo(this)">Edit</button>
    <button class='delete' onclick="deleteTodo(this)">Delete</button>
  </div>
  </div>`;
}

function deleteTodo(e) {
  localStorage.removeItem(e.parentElement.parentElement.id);
  e.parentElement.parentElement.remove();
}

const editTodo = (e) => {
  let input = e.parentElement.parentElement.querySelector('.todo-content input');
  input.readOnly = false;
}

const stopEdit = (e) => {
  if (window.event.key === 'Enter') {
    e.readOnly = true;
    let oldTodo = JSON.parse(localStorage.getItem(e.parentElement.parentElement.id));
    let UpdatedTodo = { ...oldTodo, "value": oldTodo.value = e.value }
    localStorage.setItem(e.parentElement.parentElement.id, JSON.stringify(UpdatedTodo));

  }


}

const setChecked = (e) => {
  let checked = e.checked ? 'checked' : 'unchecked';

  let todoId = e.parentElement.parentElement.id;
  let oldTodo = JSON.parse(localStorage.getItem(todoId));
  let updatedTodo = { ...oldTodo, 'checked': checked };
  console.log(updatedTodo)
  localStorage.setItem(todoId, JSON.stringify(updatedTodo));

}


// --> Clear Storage button 


const clearStorage = () => {
  localStorage.clear()
  console.log('clear records')

  setTimeout(() => {
   document.location.reload();
 }, 200)

  
}

let clear = document.getElementById("clearButton");

clear.addEventListener("click", clearStorage);

