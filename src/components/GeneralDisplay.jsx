import React, { useEffect, useState } from "react"
import Post from "./Post"
import Todo from "./Todo"
import Album from "./Album"
//display add
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
  }, [id]);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          {typeOfItem === "posts" && (
            <Post post={item} />
          )}
          {typeOfItem === "todos" && (
            <Todo status={item.completed}  id={item.id} title={item.title} />
          )}
          {typeOfItem === "albums" && (
            <Album  album={item} />
          )}
        </div>
      ))}
    </div>
  );
}
export default GenaralDisplay;