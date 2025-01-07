import React, { useState } from "react";

export default function useHandleDisplay(initialItems = null) {
    const [items, setItems] = useState(initialItems);
    const updateItem = (updatedItem) => {
        setItems((prevItems) =>
            prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
        );
    };

    const deleteItem = (deleteId) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== deleteId));
    };

    const addItem = (newItem) => {
        setItems((prevItems) => [...prevItems, newItem]);
    };

    return [items, setItems, updateItem, deleteItem, addItem];
}