import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import AddItem from "./AddItem";
import { fetchData } from "./GeneralRequests";

function Todos({ id }) {
    const [todos, setTodos] = useState(null);
    let todoAttributes = ['title', 'completed'];

    useEffect(() => {
        const fetchTodos = async () => {
            setTodos(await fetchData('todos', id));
        };
        fetchTodos();
    }, [id]);

    return (
        <div>
            <AddItem key="todos" keys={todoAttributes} type="todos" display={false} />
            {todos && todos.map((todo) => <Todo key={todo.id} todo={todo} />)}
        </div>
    );
}

export default Todos;
