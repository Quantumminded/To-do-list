//ADD TODO ITEM TO THE LIST
//FORM ID new-todo-form 
function addTodoList(category, value) {
  let newTodo = `<div class="todo-item">
<label>
  <input type="checkbox" class="checkbox_input" />
  <span class='check ${category}'></span>
</label>

<div class="todo-content">
  <input type="text" value="${value}" readonly/>
</div>

<div class="actions">
  <button class="edit">Edit</button>
  <button class="delete">Delete</button>
</div>
</div>` ;
  document.querySelector('#todo-list').innerHTML += newTodo;
  enableEditDelete();
}



// create TODO
const form = document.getElementById('new-todo-form');
const input = document.querySelector('#new-todo-form input');
const categoryOne = document.querySelector('#category1');
const categoryTwo = document.querySelector('#category2');
let category = ''
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



//FUNCTION DELETE AND EDIT (ACTIVATE)
function enableEditDelete() {

  const editBtn = document.querySelectorAll('.edit');
  //console.log(editBtn)
  const deleteBtn = document.querySelectorAll('.delete');
  editBtn.forEach(element =>
    element.addEventListener('click', (e) => {
      let parent = e.target.parentElement.parentElement;
      let input = parent.querySelector('.todo-content input');
      input.readOnly = false;
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          input.readOnly = true;
        }
      })
    }))

  deleteBtn.forEach(element =>
    element.addEventListener('click', (e) => {
      e.target.parentElement.parentElement.remove();
    }))

}


