export const filterItemsById = (deleteId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== deleteId));
};
export const updateDisplay = (updatedItem) => {
    setItems((prevItems) => prevItems.map((item) => (updatedItem.id == item.id) ? updatedItem : item))
};
export const updateAddedDisplay = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
};