import React, { useState, useEffect,useContext,createContext } from "react";
import Todo from "./Todo";
import AddItem from "./AddItem";
import { fetchData } from "./GeneralRequests";
import useUpdateDisplay from "./useUpdateDisplay";
export const DisplayContext = createContext();
function Todos({ id }) {
   // const [todos, setTodos] = useState(null);
   const [todos,setTodos,updateTodo,deleteTodo,addTodo]= useUpdateDisplay(null);
    let todoAttributes = ['title', 'completed'];

    useEffect(() => {
        const fetchTodos = async () => {
            setTodos(await fetchData('todos', id));
        };
        fetchTodos();
    }, [id]);

    return (
        <DisplayContext.Provider value={{ updateTodo ,deleteTodo}}>
        <div>
            <AddItem key="todos" keys={todoAttributes} type="todos" display={false} addDisplay={addTodo} />
            {todos && todos.map((todo) => <Todo key={todo.id} todo={todo} />)}
        </div>
        </DisplayContext.Provider>
    );
}

export default Todos;
