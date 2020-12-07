'use strict';

const todoControl = document.querySelector('.todo-control'),
headerInput = document.querySelector('.header-input'),
todoList = document.querySelector('.todo-list'),
todoCompleted = document.querySelector('.todo-completed');


let todoData = [];

const render = function() {             
    todoData = localStorage.getItem('todoData') === null ? todoData : JSON.parse(localStorage.todoData);
    
    todoList.textContent = '';         
    todoCompleted.textContent = '';
    
    todoData.forEach(function(item){
        const li = document.createElement('li');
        li.classList.add('todo-item');
        
        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +        //добавили разметку
        '<div class="todo-buttons">' + 
            '<button class="todo-remove"></button>' + 
            '<button class="todo-complete"></button>' + 
        '</div>';

        if (item.completed) { 
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

      const removeButton = li.querySelector('.todo-remove');
      const btnTodoComplete = li.querySelector('.todo-complete');

      btnTodoComplete.addEventListener('click', function() {
        item.completed = !item.completed;     
        localStorage.todoData = JSON.stringify(todoData);
        render();
      });
      
      removeButton.addEventListener('click' , function() {
        li.remove();
        todoData = todoData.filter(element => element !== item);
        localStorage.todoData = JSON.stringify(todoData);
        });
    });
}; 

todoControl.addEventListener('submit', function(event) {      //отменили стандартное поведение браузера
      event.preventDefault();

      if (headerInput.value.trim() !== '' ) {
          const newTodo = { 
          value: headerInput.value,
          completed: false
      };
            headerInput.value = '';
            todoData.push(newTodo);
            localStorage.todoData = JSON.stringify(todoData);
            render();
      } 

});

      render();