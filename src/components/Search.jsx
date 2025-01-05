import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "./GeneralRequests";
import "../css/search.css";
function Search({ type, searchItems, setItems, items, displayChanged }) {
    const [attribute, setAtribute] = useState("id");
    const [allItems, setAllItems] = useState(items);
    const [firstSearch, setFisrtSearch] = useState(false);
    const { id } = useParams();
    const searchItemsArray = async (searchValue) => {
        if (firstSearch === false) {
            setFisrtSearch(true);
            setAllItems(items);
        }
        if (displayChanged) {
            setAllItems(await fetchData(type, id));
        }
        let newarray = allItems.filter((item) => {
            const value = item[attribute];
            return (
                value &&
                value.toString().toLowerCase().includes(searchValue.toLowerCase())
            )
        });
        if (!searchValue) {
            setItems(allItems);
        }
        else { setItems(newarray); }

    }
    return (<div className="search-container"> <h2>search</h2><select id="dropdown" onChange={(e) => setAtribute(e.target.value)}>
        <option value="" disabled>Select an option</option>
        {searchItems.map((value, index) => (
            <option key={index}>{value}</option>
        ))}
    </select>
        <input onChange={(e) => { searchItemsArray(e.target.value) }} />
    </div>
    )
}
export default Search
