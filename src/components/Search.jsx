
import React, { useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { fetchData } from "./GeneralRequests";
import "../css/search.css";

function Search({ type, searchItems, setItems, items, displayChanged }) {
    const [attribute, setAttribute] = useState("id");
    const [allItems, setAllItems] = useState(items);
    const [firstSearch, setFirstSearch] = useState(false);
    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    // Get the current value for the selected attribute from the URL
    const searchValue = searchParams.get(attribute) || "";

    const searchItemsArray = async (inputValue) => {
        // Update the URL with the attribute and its value
        setSearchParams({ [attribute]: inputValue });

        // Fetch fresh data only once
        if (!firstSearch) {
            setFirstSearch(true);
            setAllItems(items);
        }

        // Fetch items if the displayChanged flag is true
        if (displayChanged) {
            const fetchedItems = await fetchData(type, id);
            setAllItems(fetchedItems);
        }

        // Filter the items based on the search value
        const filteredItems = allItems.filter((item) => {
            const value = item[attribute];
            return (
                value &&
                value.toString().toLowerCase().includes(inputValue.toLowerCase())
            );
        });

        // Set filtered items or all items if the search field is empty
        setItems(inputValue ? filteredItems : allItems);
    };

    return (
        <div className="search-container">
            <h2>Search</h2>
            <select
                className="search-dropdown"
                value={attribute}
                onChange={(e) => setAttribute(e.target.value)}
            >
                <option value="" disabled>Select an option</option>
                {searchItems.map((value, index) => (
                    <option key={index} value={value}>
                        {value}
                    </option>
                ))}
            </select>
            <input
                type="text"
                className="search-input"
                placeholder={`Search by ${attribute}...`}
                value={searchValue} // Sync the input value with the selected attribute's value
                onChange={(e) => searchItemsArray(e.target.value)}
            />
        </div>
    );
}

export default Search;
