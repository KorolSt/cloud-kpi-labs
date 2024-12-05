const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
 
async function fetchTodos() {
  const response = await fetch('/todos');
  const todos = await response.json();
  renderTodos(todos);
}
 
function renderTodos(todos) {
  todoList.innerHTML = '';  
  todos.forEach((todo) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" ${todo.completed ? 'checked' : ''} data-id="${todo.id}" />
      <span>${todo.title}</span>
      <button data-id="${todo.id}">Delete</button>
    `;
    todoList.appendChild(li);
  });
}
 
todoForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const response = await fetch('/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  const newTodo = await response.json();
  fetchTodos();  
  todoForm.reset();
});
 
todoList.addEventListener('click', async (e) => {
  if (e.target.tagName === 'INPUT') {
    const id = e.target.dataset.id;
    const completed = e.target.checked;
    await fetch(`/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed }),
    });
    fetchTodos();  
  }

  if (e.target.tagName === 'BUTTON') {
    const id = e.target.dataset.id;
    await fetch(`/todos/${id}`, {
      method: 'DELETE',
    });
    fetchTodos();  
  }
});
 
fetchTodos();
