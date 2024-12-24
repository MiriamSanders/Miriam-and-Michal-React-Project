import React,{useContext} from "react"
import { FaTrash } from "react-icons/fa";
import { DisplayContext } from "../components/GeneralDisplay";
function Delete({id,type}) {
    const { filterItemsById } = useContext(DisplayContext);
    async function deleteItem() {
        try{
        let response = await fetch(`http://localhost:3000/${type}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.ok){
            filterItemsById(id);
        }
    }
    catch(error)
    {
        console.log(error);
        
    }
    }
    return (<>
        <FaTrash onClick={deleteItem}></FaTrash>
    </>

    )
}
export default Delete;