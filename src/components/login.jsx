import React, { useState} from "react";
import { useNavigate } from "react-router-dom";  
import '../css/login.css'
import { userContext } from "./App";
import { useContext } from "react";
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {setUserData}= useContext(userContext);
    async function checkIFUserExists() {
        let response = await fetch(`http://localhost:3000/users/?username=${username}`);
        if (response.status >= 200 && response.status < 300) {
            const user = await response.json();

            if (user.length > 0 && user[0].website === password) {
                setUserData(user[0]);
                localStorage.setItem("currentUser",JSON.stringify(user[0])
                );
                navigate(`/home`);
            } else {
                alert('Incorrect password');
            }
        } else {
            alert('User doesn’t exist');
        }
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    return (
        <div>
        <div className="login-container">
            <input
                name="username"
                placeholder="Username"
                className="login-input"
                onChange={handleUsernameChange} 
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
        <button className="switch-signup" onClick={()=>navigate('/register')}>don't have an account yet?</button>
        </div>
    );
}

export default Login;
