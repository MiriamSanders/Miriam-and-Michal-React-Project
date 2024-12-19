import React, { useState } from "react";

function Todo({ status, id, title }) {
  const [checked, setChecked] = useState(status);

  const handleCheckboxChange = async () => {
    // Toggle the checkbox state locally
    setChecked(!checked);

    try {
      // Make a PATCH request to update the status in the database
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed:true, // toggle the status
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
    <div>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange} 
      />
      <p>{id}</p>
      <p>{title}</p>
    </div>
  );
}

export default Todo;
