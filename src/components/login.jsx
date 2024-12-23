import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // To handle navigation
import '../css/login.css'
//check inputs
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();  // React Router's hook to handle navigation

    async function checkIFUserExists() {
        let response = await fetch(`http://localhost:3000/users/?username=${username}`);  // Make sure the endpoint matches your API
        if (response.status >= 200 && response.status < 300) {
            const user = await response.json();  // Get the user data from the response

            if (user.length > 0 && user[0].website === password) {  // Check if the website matches the password (or any other logic you need)
                navigate(`/users/${user[0].id}`);  // Navigate to the user's page, replace `/user/${user[0].id}` with the correct route
            } else {
                alert('Incorrect password');
            }
        } else {
            alert('User doesn’t exist');
        }
    }

    return (
        <div className="login-container">
            <input 
                name="username" 
                placeholder="Username" 
                 className="login-input"
                onChange={(e) => setUsername(e.target.value)}  // Corrected to e.target.value
            />
            <input 
                name="password" 
                type="password"
                placeholder="Password" 
                 className="login-input"
                onChange={(e) => setPassword(e.target.value)}  // Corrected to e.target.value
            />
            <button  className="login-button" onClick={checkIFUserExists}>Login</button>
        </div>
    );
}

export default Login;
