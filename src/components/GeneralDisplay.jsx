import React, { createContext, useState, useEffect, useContext } from "react";
import Post from "./Post"
import Todo from "./Todo"
import Album from "./Album"
import AddItem from "./AddItem";
//display add
export const DisplayContext = createContext();
function GenaralDisplay({ id, typeOfItem }) {
  const [items, setItems] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/${typeOfItem}/?userId=${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        if (result.length > 0) {
          setItems(result)
        } else {
          throw new Error("No user found with that ID");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, typeOfItem]);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const filterItemsById = (deleteId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== deleteId));
  };
  const updateDisplay = (updatedItem) => {
    setItems((prevItems)=>prevItems.map((item)=>(updatedItem.id==item.id)?updatedItem:item))
  };
  const updateAddedDisplay=(newItem)=>{
    setItems ((prevItems)=>[...prevItems,newItem]);
  };
  return (
    <DisplayContext.Provider value={{ filterItemsById ,updateDisplay,updateAddedDisplay}}>
      <div>
        <AddItem key={typeOfItem} keys={Object.keys(items[0])} type={typeOfItem} display={false}/>
        {items.map((item) => (
          <div key={item.id}>
            {typeOfItem === "posts" && (
              <Post post={item} />
            )}
            {typeOfItem === "todos" && (
              <Todo status={item.completed} id={item.id} title={item.title} />
            )}
            {typeOfItem === "albums" && (
              <Album album={item} />
            )}
          </div>
        ))}
      </div>
    </DisplayContext.Provider>
  );
}
export default GenaralDisplay;