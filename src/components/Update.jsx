import React, { useState, useContext } from "react";
import { FaPen } from "react-icons/fa";
// import { DisplayContext } from "./GeneralRequests";
import "../css/Update.css"

function Update({ item, type }) {
    // const { updateDisplay } = useContext(DisplayContext);
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
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });
            if (response.ok) {
              //  updateDisplay(updatedData);
                setShowUpdateDetails(false);
            }
        } catch (ex) {
            console.log(ex);
        }
    }

    const handleCancel = () => {
        setUpdatedItem(item);
        setShowUpdateDetails(false);
    };

    return (
        <>
            <FaPen onClick={() => setShowUpdateDetails(true)} />
            {showUpdateDetails && (
                <div className="overlay">
                    <div className="modal">
                        <h2>Edit {type}</h2>
                        {Object.keys(updatedItem).map(
                            (key) =>
                                key !== "id" &&
                                key !== "userId" && (
                                    <div key={key} style={{ marginBottom: "10px" }}>
                                        <label
                                            htmlFor={key}
                                            style={{ display: "block", fontWeight: "bold" }}
                                        >
                                            {key}:
                                        </label>
                                        <input
                                            id={key}
                                            value={updatedItem[key]}
                                            placeholder={key}
                                            onChange={(e) =>
                                                handleInputChange(key, e.target.value)
                                            }
                                            style={{
                                                width: "100%",
                                                padding: "8px",
                                                border: "1px solid #ccc",
                                                borderRadius: "4px",
                                            }}
                                        />
                                    </div>
                                )
                        )}
                        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                            <button onClick={updateItem} className="btn-primary">
                                Update
                            </button>
                            <button onClick={handleCancel} className="btn-primary">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Update;
