//ADD TODO ITEM
//FORM ID new-todo-form 
function addTodoList (category,value){
let newTodo = `<div class="todo-item">
<label>
  <input class="checkbox_input" type="checkbox" />
  <span class='check ${category}'></span>
</label>

<div class="todo-content">
  <input type="text" value="${value}" readonly/>
</div>

<div class="actions">
  <button class="edit">Edit</button>
  <button class="delete" onclick="removeItem()">Delete</button>
</div>
</div>`; ;

document.querySelector('#todo-list').innerHTML += newTodo;
}




const form = document.getElementById('new-todo-form');
const input = document.querySelector('#new-todo-form input');
const categoryOne = document.querySelector('#category1');
const categoryTwo = document.querySelector('#category2');
let category = ''
categoryOne.addEventListener('click',(e)=>{
    category =  e.target.value;
});

categoryTwo.addEventListener('click',(e)=>{
    category =  e.target.value;
});
//console.log(input)
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(!input.value){
        return '';
    }
    addTodoList(category,input.value);
    category= '';
})



//Delete button
function removeItem() {
    const todoItemDiv = document.querySelector('.todo-item');
    todoItemDiv.remove();
}


// function editElement() {
//     console.log();
// }

