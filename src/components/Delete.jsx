import React, { useContext } from "react"
import { FaTrash } from "react-icons/fa";
//import { DisplayContext } from "./GeneralRequests";
import '../css/Delete.css'

function Delete({ id, type,deleteDisplay }) {
   // const { filterItemsById } = useContext(DisplayContext);
    async function deleteItem() {
        try {
            let response = await fetch(`http://localhost:3000/${type}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                deleteDisplay(id);
            }
        }
        catch (error) {
            console.log(error);

        }
    }
    return (<>
        <FaTrash className="edit-icon" onClick={deleteItem}></FaTrash>
    </>

    )
}
export default Delete;