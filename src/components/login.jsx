import React, { useState ,useRef} from "react";
import { useNavigate } from "react-router-dom";  // To handle navigation
import '../css/login.css'
//check inputs
function Login({ usernameRef }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function checkIFUserExists() {
        let response = await fetch(`http://localhost:3000/users/?username=${username}`);
        if (response.status >= 200 && response.status < 300) {
            const user = await response.json();

            if (user.length > 0 && user[0].website === password) {
                navigate(`/home/users/${user[0].id}`);
            } else {
                alert('Incorrect password');
            }
        } else {
            alert('User doesn’t exist');
        }
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        if (usernameRef) {
            usernameRef.current = e.target.value; 
        }
    };

    return (
        <div className="login-container">
            <input
                name="username"
                placeholder="Username"
                className="login-input"
                onChange={handleUsernameChange} // Update both state and ref
            />
            <input
                name="password"
                type="password"
                placeholder="Password"
                className="login-input"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="login-button" onClick={checkIFUserExists}>
                Login
            </button>
        </div>
    );
}

export default Login;
