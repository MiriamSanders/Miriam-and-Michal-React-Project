import React, { useState, useContext } from "react";
import { FaPen } from "react-icons/fa";
import { DisplayContext } from "../components/GeneralDisplay";

function Update({ item, type }) {
    const { updateDisplay } = useContext(DisplayContext);
    const [showUpdateDetails, setShowUpdateDetails] = useState(false);
    const [updatedItem, setUpdatedItem] = useState(item);
    const handleInputChange = (key, value) => {
        setUpdatedItem((prevItem) => ({
            ...prevItem,
            [key]: value,
        }));
    };
    async function updateItem() {
        const updatedData = { ...item, ...updatedItem };
        try {
            let response = await fetch(`http://localhost:3000/${type}/${item.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
            if (response.ok) {
                updateDisplay(updatedData);
                setShowUpdateDetails(false);

            }
        }
        catch (ex) {
            console.log(ex);

        }

    }
    return (
        <>
            <FaPen onClick={() => setShowUpdateDetails(true)} />
            {showUpdateDetails && <div>
                {Object.keys(updatedItem).map((key) => ((key != 'id' && key != 'userId') &&
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
