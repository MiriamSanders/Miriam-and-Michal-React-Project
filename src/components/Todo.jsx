import React, { useState, useContext } from "react";
import '../css/todo.css';
import { DisplayContext } from "./todos";

import Update from "./Update";
import Delete from "./Delete";
function Todo({ todo }) {
   const [checked, setChecked] = useState(todo.completed);
   const { updateTodo,deleteTodo } = useContext(DisplayContext);

   const handleCheckboxChange = async () => {
      setChecked(!checked);

      try {
         const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
            method: 'PATCH',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               completed: !checked, 
            }),
         });

         if (!response.ok) {
            throw new Error("Network response was not ok");
         }

         const result = await response.json();
         console.log('Update successful:', result);
      } catch (error) {
         console.error('Error updating todo:', error.message);
      }
   };

   return (
      <div className="todo-container">
         <input
            type="checkbox"
            checked={checked}
            onChange={handleCheckboxChange}
            className="todo-checkbox"
         />
         <p className="todo-id">{todo.id}</p>
         <p className={`todo-title ${checked ? 'completed' : ''}`}>{todo.title}</p>
     <Update item={{id:todo.id,title:todo.title}} type='todos' updateDisplay={updateTodo}/>
        <Delete id={todo.id} type='todos' deleteDisplay={deleteTodo}/>
      </div>
   );
}

export default Todo;
