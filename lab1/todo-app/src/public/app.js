const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

 
const fetchTodos = async () => {
  try {
    const response = await fetch('/todos');
    const todos = await response.json();

    todoList.innerHTML = ''; 
    todos.forEach(todo => {
      const li = document.createElement('li');
      li.textContent = todo.title;

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = () => deleteTodo(todo.id);

      li.appendChild(deleteButton);
      todoList.appendChild(li);
    });
  } catch (err) {
    console.error('Error fetching todos:', err);
  }
};

 
todoForm.onsubmit = async (e) => {
  e.preventDefault();

  try {
    const title = todoInput.value;
    await fetch('/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });

    todoInput.value = '';  
    fetchTodos();  
  } catch (err) {
    console.error('Error adding todo:', err);
  }
};

 
const deleteTodo = async (id) => {
  try {
    await fetch(`/todos/${id}`, { method: 'DELETE' });
    fetchTodos();  
  } catch (err) {
    console.error('Error deleting todo:', err);
  }
};

 
fetchTodos();
