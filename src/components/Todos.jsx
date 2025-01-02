import React, { useState, useEffect, useContext, createContext } from "react";
import Todo from "./Todo";
import AddItem from "./AddItem";
import { fetchData } from "./GeneralRequests";
import useUpdateDisplay from "./useUpdateDisplay";
import "../css/sort.css"
export const DisplayContext = createContext();
function Todos({ id }) {
    // const [todos, setTodos] = useState(null);
    const [todos, setTodos, updateTodo, deleteTodo, addTodo] = useUpdateDisplay(null);
    let todoAttributes = ['title', 'completed'];
    let sortAttributes = ['id', 'title', 'completed', 'random'];

    useEffect(() => {
        const fetchTodos = async () => {
            setTodos(await fetchData('todos', id));
        };
        fetchTodos();
    }, [id]);
    function sortByAttributes(sortValue) {
        setTodos((prevTodos) => {
            const sortedTodos = [...prevTodos];
            if (sortValue === "random") {
                sortedTodos.sort(() => Math.random() - 0.5);
            } else if (sortValue === "completed") {
                sortedTodos.sort((a, b) => {
                    const valueA = a[sortValue] ? 1 : 0;
                    const valueB = b[sortValue] ? 1 : 0;
                    return valueA - valueB;
                });
            } else {

                sortedTodos.sort((a, b) => {
                    if (a[sortValue] < b[sortValue]) return -1;
                    if (a[sortValue] > b[sortValue]) return 1;
                    return 0;
                });
            }
            return sortedTodos;
        });
    }



    return (
        <DisplayContext.Provider value={{ updateTodo, deleteTodo }}>
            <div >

                <div className="sort-container">
                    <h2>sort by:</h2>
                    <select id="dropdown" onChange={(e) => sortByAttributes(e.target.value)}>
                        <option value="" disabled>Select an option</option>
                        {sortAttributes.map((value, index) => (
                            <option key={index}>{value}</option>
                        ))}
                    </select>
                </div>
                <AddItem key="todos" keys={todoAttributes} type="todos" display={false} addDisplay={addTodo} />
                {todos && todos.map((todo) => <Todo key={todo.id} todo={todo} />)}
            </div>
        </DisplayContext.Provider>
    );
}

export default Todos;
