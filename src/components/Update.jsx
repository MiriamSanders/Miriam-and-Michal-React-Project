import React, { useState } from "react";
import { FaPen } from "react-icons/fa";

function Update({ item, type }) {
    const [showUpdateDetails, setShowUpdateDetails] = useState(false);
    const [updatedItem, setUpdatedItem] = useState(item); // Create a copy of the item for editing

    const handleInputChange = (key, value) => {
        setUpdatedItem((prevItem) => ({
            ...prevItem,
            [key]: value,
        }));
    };
    async function updateItem() {
        const updatedData = { ...item, ...updatedItem };
        let response = await fetch(`http://localhost:3000/${type}/${item.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( updatedData),
        });
    }
    return (
        <>
            <FaPen onClick={() => setShowUpdateDetails(true)} />
            {showUpdateDetails && <div>
                {Object.keys(updatedItem).map((key) => (
                    <div key={key}>
                        <input
                            value={updatedItem[key]}
                            placeholder={key}
                            onChange={(e) => handleInputChange(key, e.target.value)}
                        />
                    </div>

                ))}
                <button type="button" onClick={updateItem}>update</button>
            </div>
            }
        </>
    );
}

export default Update;
