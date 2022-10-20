
const form = document.getElementById('new-todo-form');
const input = document.querySelector('#new-todo-form input');
const categoryOne = document.querySelector('#category1');
const categoryTwo = document.querySelector('#category2');
let category = '';
categoryOne.addEventListener('click', (e) => {
  category = e.target.value;
});

categoryTwo.addEventListener('click', (e) => {
  category = e.target.value;
});
//console.log(input)
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
    document.querySelector('#todo-list').innerHTML += value;
  }
}



function enableEditAll() {
  const editBtn = document.querySelectorAll('.edit');

  editBtn.forEach(element =>
    element.addEventListener('click', (e) => {
      let parent = e.target.parentElement.parentElement;
      let input = parent.querySelector('.todo-content input');
      let oldInputValue = `value='${input.value}'`;
      input.readOnly = false;
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          input.readOnly = true;
          let newInputValue = `value='${input.value}'`;
          let updatedTodo = localStorage.getItem(parent.id).replace(oldInputValue, newInputValue);
          localStorage.setItem(parent.id, updatedTodo);
        }


      })
    }))
}

function enableDeleteAll() {
  const deleteBtn = document.querySelectorAll('.delete');

  deleteBtn.forEach(element =>
    element.addEventListener('click', (e) => {
      localStorage.removeItem(e.target.parentElement.parentElement.id);
      e.target.parentElement.parentElement.remove();

    }))
}


//ADD TODO ITEM TO THE LIST
//FORM ID new-todo-form 
function addTodoList(category, value) {
  let id = Date.now();
  let newTodo = createTodo(id, category, value);

  localStorage.setItem(id, newTodo);
  document.querySelector('#todo-list').innerHTML += newTodo;
  enableDeleteAll();
  enableEditAll();
}

function createTodo(id, category, value) {
  // const checkbox = document.querySelector('.checkbox_input')
  // const handleClick = ()=>{ console.log(checkbox) }
  
  // checkbox.addEventListener('click', ()=>{ console.log(checkbox)})
  // console.log(checkbox)

  return `<div class='todo-item' id='${id}'>
  <label>
    <input id="checkbox" type='checkbox' class='checkbox_input' />
    <span class='check ${category}'></span>
  </label>
  <div class='todo-content'>
    <input type="text" value='${value}' readonly/>
  </div>
  <div class='actions'>
    <button class='edit'>Edit</button>
    <button class='delete'>Delete</button>
  </div>
  </div>`;
}




window.addEventListener('load', e => {
  loadAll();
  enableDeleteAll();
  enableEditAll();
});

