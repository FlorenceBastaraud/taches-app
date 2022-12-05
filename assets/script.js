window.addEventListener('load', () => {
  let todos = [];

  if(localStorage.getItem('todos')){
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  const formTodo = document.getElementById('new-todo-form');
  const inputTodo = document.getElementById('new-todo-input');
  const divTodos = document.getElementById('todos');

  
  displayTodos(todos);

  // Ajout d'une nouvelle tâche
  formTodo.addEventListener('submit', (e) => {
    e.preventDefault();

    if(!inputTodo.value){
      alert('Renseignez une tâche à réaliser');
      return;
    }

    const newTodo = {
      id: new Date(),
      name: inputTodo.value.trim(),
      state: false
    }

    todos.push(JSON.stringify(newTodo));
  
    localStorage.setItem('todos', JSON.stringify(todos));

    
    divTodos.innerHTML = "";
    displayTodos(todos);

    formTodo.reset();


  })

    // Function d'affichage des tâches + actions
    function displayTodos(insertTodos){

      insertTodos.map(todo => {

          const tempIndex = todos.indexOf(todo);

          todo = JSON.parse(todo);
          
          const todoItem = document.createElement('div');
          todoItem.classList.add('todo-item');
      
          const todoContent = document.createElement('div');
          todoContent.classList.add('todo-content');
      
          const todoState = document.createElement('input');
          todoState.setAttribute('type', 'checkbox');
          todoState.classList.add('todo-state');
      
          const todoText = document.createElement('input');
          todoText.setAttribute('type', 'text');
          todoText.setAttribute('readonly', 'readonly');
          todoText.classList.add('todo-text');
          todoText.setAttribute('value', todo.name);
      
          const todoActions = document.createElement('div');
          todoActions.classList.add('todo-actions');
      
          const todoEdit = document.createElement('span');
          todoEdit.classList.add('todo-edit');
      
          const todoEditIcon = document.createElement('i');
          todoEditIcon.classList.add('fa-solid');
          todoEditIcon.classList.add('fa-pen-to-square');
    
          const todoDelete = document.createElement('span');
          todoDelete.classList.add('todo-delete');
      
          const todoDeleteIcon = document.createElement('i');
          todoDeleteIcon.classList.add('fa-solid');
          todoDeleteIcon.classList.add('fa-trash');
      
      
          todoItem.appendChild(todoContent);
          todoItem.appendChild(todoActions);
      
          todoContent.appendChild(todoState);
          todoContent.appendChild(todoText);
      
          todoActions.appendChild(todoEdit);
          todoActions.appendChild(todoDelete);
    
          todoEdit.appendChild(todoEditIcon);
    
          todoDelete.appendChild(todoDeleteIcon);
      
          divTodos.appendChild(todoItem);

          // Modif todo
          todoEditIcon.addEventListener('click', () => {

            if(todoEditIcon.classList.contains('fa-pen-to-square')){
              todoText.removeAttribute('readonly');
              todoEditIcon.classList.remove('fa-pen-to-square');
              todoEditIcon.classList.add('fa-solid');
              todoEditIcon.classList.add('fa-check');
              todoText.style.backgroundColor = '#fff';
              todoText.style.caretColor = '#000';
              todoText.focus();
            } else {
              todoText.setAttribute('readonly', 'readonly');
              todoEditIcon.classList.add('fa-solid');
              todoEditIcon.classList.add('fa-pen-to-square');
              todoEditIcon.classList.remove('fa-check');
              todoText.style.backgroundColor = 'transparent';
              todoText.style.caretColor = 'transparent';

              const updatedTodo = {
                id: todo.id,
                name: todoText.value,
                state: todo.state
              }

              todos.splice(tempIndex, 1, JSON.stringify(updatedTodo));
              localStorage.setItem('todos', JSON.stringify(todos));
            }

          })

          // Supp todo
          todoDeleteIcon.addEventListener('click', () => {
            divTodos.removeChild(todoItem);
            todos.splice(tempIndex, 1);
            localStorage.setItem('todos', JSON.stringify(todos));

          })


          // Srocker état du todo
          todoState.addEventListener('click', (e) => {

            if(todoState.checked){
              todo.state = true;
              todoContent.style.textDecoration = 'line-through';
              todos.splice(tempIndex, 1, JSON.stringify(todo));
              localStorage.setItem('todos', JSON.stringify(todos));
            } else {
              todo.state = false;
              todoContent.style.textDecoration = 'none';
              todos.splice(tempIndex, 1, JSON.stringify(todo));
              localStorage.setItem('todos', JSON.stringify(todos));
            }

          })


          todo.state ? todoState.setAttribute('checked', 'checked') : todoState.removeAttribute('checked');

          
          todo.state ? todoContent.style.textDecoration = 'line-through' : todoContent.style.textDecoration = 'none';
          
      
        })
     
    }

    

})


