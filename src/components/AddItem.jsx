import React, { useState } from "react";
import { useParams } from "react-router-dom";

function AddItem({keys,type})
{
    const { id } = useParams();
    const [showAddItem,setShowAddItem]=useState(false);
    const [item,setItem]=useState({"userId":id});
   const handleInputChange=(key,value)=>{
    setItem((prevItem) => ({
        ...prevItem,
        [key]: value,
    }));
   }
    const addNewItem=async()=>{
        try {
            let response = await fetch(`http://localhost:3000/${type}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            });
            if (response.ok) {
             //   updateDisplay(item)
            }
        }
        catch (ex) {
            console.log(ex);

        }
    };
  return(<>
  <button onClick={()=>setShowAddItem(true)}>{ `add ${type}`}</button>
  {showAddItem&&<div>{keys.map((key)=>{if((key != 'id' && key != 'userId')) return <input placeholder={key}  onChange={(e) => handleInputChange(key, e.target.value)}/>})}</div>}
  <button type="button" onClick={addNewItem}>send</button>
  </>)
}
export default AddItem;