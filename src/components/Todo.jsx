import React, { useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import '../css/todo.css'
function Todo({ status, id, title }) {
   const [checked, setChecked] = useState(status);

   const handleCheckboxChange = async () => {
      setChecked(!checked);

      try {
         const response = await fetch(`http://localhost:3000/todos/${id}`, {
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
         <p className="todo-id">{id}</p>
         <p className={`todo-title ${checked ? 'completed' : ''}`}>{title}</p>
         <FaPen/>
         <FaTrash/>
      </div>
   );
}

export default Todo;
