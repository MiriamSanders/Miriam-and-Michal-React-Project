// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import { fetchData } from "./GeneralRequests";
// import "../css/search.css";
// function Search({ type, searchItems, setItems, items, displayChanged }) {
//     const [attribute, setAtribute] = useState("id");
//     const [allItems, setAllItems] = useState(items);
//     const [firstSearch, setFisrtSearch] = useState(false);
//     const { id } = useParams();
//     const searchItemsArray = async (searchValue) => {
//         if (firstSearch === false) {
//             setFisrtSearch(true);
//             setAllItems(items);
//         }
//         if (displayChanged) {
//             setAllItems(await fetchData(type, id));
//         }
//         let newarray = allItems.filter((item) => {
//             const value = item[attribute];
//             return (
//                 value &&
//                 value.toString().toLowerCase().includes(searchValue.toLowerCase())
//             )
//         });
//         if (!searchValue) {
//             setItems(allItems);
//         }
//         else { setItems(newarray); }

//     }
//     return (<div className="search-container"> <h2>search</h2><select id="dropdown" onChange={(e) => setAtribute(e.target.value)}>
//         <option value="" disabled>Select an option</option>
//         {searchItems.map((value, index) => (
//             <option key={index}>{value}</option>
//         ))}
//     </select>
//         <input onChange={(e) => { searchItemsArray(e.target.value) }} />
//     </div>
//     )
// }
// export default Search
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "./GeneralRequests";
import "../css/search.css";

function Search({ type, searchItems, setItems, items, displayChanged }) {
    const [attribute, setAttribute] = useState("id");
    const [allItems, setAllItems] = useState(items);
    const [firstSearch, setFirstSearch] = useState(false);
    const { id } = useParams();

    const searchItemsArray = async (searchValue) => {
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
                value.toString().toLowerCase().includes(searchValue.toLowerCase())
            );
        });

        // Set filtered items or all items if the search field is empty
        setItems(searchValue ? filteredItems : allItems);
    };

    return (
        <div className="search-container">
            <h2>Search</h2>
            <select
                className="search-dropdown"
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
                placeholder="Enter your search..."
                onChange={(e) => searchItemsArray(e.target.value)}
            />
        </div>
    );
}

export default Search;
