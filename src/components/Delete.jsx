import React from "react"
import { FaTrash } from "react-icons/fa";
function Delete({id,type}) {
    async function deleteItem() {
        let response = await fetch(`http://localhost:3000/${type}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    return (<>
        <FaTrash onClick={deleteItem}></FaTrash>
    </>

    )
}
export default Delete;