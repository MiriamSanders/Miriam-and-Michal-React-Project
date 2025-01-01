import React,{useState} from "react";
function Search ({searchItems,items})
{
  const [Attribute,setAtribute]=useState();
  const [searchData,setSearchData]=useState();
    const searchItemsArray=(sortBy)=>{ 
        let newarray=items.filter((item)=>item[Attribute]==searchData)
       console.log(newarray)
        return newarray;
    }
    return ( <> <select id="dropdown" onChange={(e) => setAtribute(e.target.value)}>
    <option value="" disabled>Select an option</option>
    {searchItems.map((value, index) => (
        <option key={index}>{value}</option>
    ))}
</select>
<input onChange={(e) => setSearchData(e.target.value)}/>
<button type="button" onClick={searchItemsArray} >search</button>
</>
)
}
export default Search