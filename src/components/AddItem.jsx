import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { DisplayContext } from "../components/GeneralDisplay";

function AddItem({ keys, type, display }) {
    const { id } = useParams();
    const { updateAddedDisplay } = useContext(DisplayContext);
    const [showAddItem, setShowAddItem] = useState(display);
    const [item, setItem] = useState({ userId: id });

    const handleInputChange = (key, value) => {
        setItem((prevItem) => ({
            ...prevItem,
            [key]: value,
        }));
    };

    const isFormValid = () => {
        return Object.keys(item).some(
            (key) => key !== "userId" && item[key] && item[key].trim() !== ""
        );
    };

    const addNewItem = async () => {
        if (!isFormValid()) {
            alert("Please fill in at least one field before saving.");
            return;
        }

        try {
            let response = await fetch(`http://localhost:3000/${type}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            });
            if (response.ok) {
                setShowAddItem(false);
                updateAddedDisplay(item);
            }
        } catch (ex) {
            console.log(ex);
        }
    };

    return (
        <>
            <button onClick={() => setShowAddItem(true)}>{`Add ${type}`}</button>
            {showAddItem && (
                <div className="postContainer">
                    {keys.map((key) => (
                        key !== 'id' && key !== 'userId' && (
                            <div key={key} style={{ marginBottom: '10px' }}>
                                <label htmlFor={key} style={{ display: 'block', fontWeight: 'bold' }}>{key}:</label>
                                <input
                                    id={key}
                                    placeholder={key}
                                    onChange={(e) => handleInputChange(key, e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        marginBottom: '10px',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                    }}
                                />
                            </div>
                        )
                    ))}
                    <div>
                        <button
                            onClick={addNewItem}
                            style={{ marginRight: '10px' }}
                        >
                            Send
                        </button>
                        <button
                            onClick={() => setShowAddItem(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default AddItem;
