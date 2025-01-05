
 export const fetchData = async (typeOfItem,id="") => {
        try {
          const response = await fetch(`http://localhost:3000/${typeOfItem}/?userId=${id}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const result = await response.json();
          if (result.length > 0) {
            return result
          } else {
            throw new Error("No user found with that ID");
          }
        } catch (error) {
         // setError(error.message);
        } finally {
         // setLoading(false);
        }
      };