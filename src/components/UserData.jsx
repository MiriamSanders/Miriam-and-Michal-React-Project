import React, { useEffect, useState } from "react";

function UserData({ id }) {
  const [user, setUser] = useState(null);  // אובייקט שמכיל את המידע על המשתמש
  const [error, setError] = useState(null);  // משתנה לשמירת שגיאות
  const [loading, setLoading] = useState(true);  // משתנה לניהול מצב טעינה

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/?id=${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        if (result.length > 0) {
          setUser(result[0]); 
        } else {
          throw new Error("No user found with that ID");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();  
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="displayUserData">
      <h1>{user.name} Details</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <h2>Address</h2>
      <p><strong>Street:</strong> {user.address.street}</p>
      <p><strong>Suite:</strong> {user.address.suite}</p>
      <p><strong>City:</strong> {user.address.city}</p>
      <p><strong>Zipcode:</strong> {user.address.zipcode}</p>
      <p><strong>Latitude:</strong> {user.address.geo.lat}</p>
      <p><strong>Longitude:</strong> {user.address.geo.lng}</p>
      <h2>Phone & Website</h2>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Website:</strong> <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a></p>
      <h2>Company</h2>
      <p><strong>Company Name:</strong> {user.company.name}</p>
      <p><strong>Catchphrase:</strong> {user.company.catchPhrase}</p>
      <p><strong>BS:</strong> {user.company.bs}</p>
    </div>
  );
}

export default UserData;
