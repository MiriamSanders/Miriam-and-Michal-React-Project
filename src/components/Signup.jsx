import React, { useState, useReducer, useRef, useContext } from "react"
import { useNavigate } from "react-router-dom";
import '../css/login.css'
import { userContext } from "./App";
//check inputs- mybe useForm?
// הגדרת פעולות שיכולות לקרות בטופס
const initialState = {
    // isSignedUp: false,
    name: "",
    email: "",
    city: "",
    suite: "",
    street: "",
    zipcode: "",
    latitude: "",
    longitude: "",
    phone: "",
    website: "",
    companyName: "",
    catchPhrase: "",
    bs: ""
};

// פעולה לעדכון שדה
const formReducer = (state, action) => {
    switch (action.type) {
        case "SET_FIELD":
            return { ...state, [action.field]: action.value };
        // case "SIGN_UP":
        //     return { ...state, isSignedUp: true };
        default:
            return state;
    }
};
function Signup({ usernameRef }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setverifyPassword] = useState('');
    const [succsessfulSignUP, setSuccessfulSignUp] = useState(false);
    const [state, dispatch] = useReducer(formReducer, initialState);
    const { setUserData } = useContext(userContext);
    const navigate = useNavigate();
    async function startSignUp() {
        if (password === verifyPassword) {
            let response = await fetch(`http://localhost:3000/users/?website=${password}`);  // Make sure the endpoint matches your API
            if (response.status >= 200 && response.status < 300) {
                let jsonRes = await response.json();
                if (jsonRes.length == 0) { setSuccessfulSignUp(true); }
                else {
                    alert('User already exists');
                }
            }
        }
        else alert('the two password fields arent equal')
    }
    async function addUser() {
        const createUser = {
            username: username,
            name: state.name,
            email: state.email,
            address: {
                city: state.city,
                suite: state.suite,
                street: state.street,
                zipcode: state.zipcode,
                geo: {
                    lat: state.latitude,
                    lng: state.longitude
                }
            },
            phone: state.phone,
            website: password,
            company: {
                name: state.companyName,
                catchPhrase: state.catchPhrase,
                bs: state.bs
            }
        };

        try {
            const response = await fetch("http://localhost:3000/users", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(createUser),
            });
            if (response.ok) {
                let createdUser = await response.json();
                setUserData(createUser);
                localStorage.setItem("currentUser", JSON.stringify(createdUser));
                navigate(`/home/users/${createdUser.id}`);

            }

        }
        catch (ex) {

        }
    }
    return (
        <>
            {!succsessfulSignUP &&
                <div className="login-container">
                    <input name="username" placeholder="userName" className="login-input" ref={usernameRef} onChange={(e) => setUsername(e.target.value)} />
                    <input name="password" placeholder="password" className="login-input" onChange={(e) => setPassword(e.target.value)} />
                    <input name="verifyPassword" placeholder="password" className="login-input" onChange={(e) => setverifyPassword(e.target.value)} />
                    <button type="button" className="login-button" onClick={startSignUp}>submit</button>
                </div>}
            {
                succsessfulSignUP &&
                <div className="login-container">
                    <input name="name" placeholder="name" className="login-input" value={state.name}
                        onChange={(e) =>
                            dispatch({ type: "SET_FIELD", field: "name", value: e.target.value })
                        } />
                    <input name="email" placeholder="email" className="login-input" value={state.email}
                        onChange={(e) =>
                            dispatch({ type: "SET_FIELD", field: "email", value: e.target.value })
                        } />
                    <label >address:</label>
                    <input name="city" placeholder="city" className="login-input" value={state.city}
                        onChange={(e) =>
                            dispatch({ type: "SET_FIELD", field: "city", value: e.target.value })
                        } />
                    <input name="suite" placeholder="suite" className="login-input" value={state.suite}
                        onChange={(e) =>
                            dispatch({ type: "SET_FIELD", field: "suite", value: e.target.value })
                        } />
                    <input name="street" placeholder="street" className="login-input" value={state.street}
                        onChange={(e) =>
                            dispatch({ type: "SET_FIELD", field: "street", value: e.target.value })
                        } />
                    <input name="zipcode" placeholder="zipcode" className="login-input" value={state.zipcode}
                        onChange={(e) =>
                            dispatch({ type: "SET_FIELD", field: "zipcode", value: e.target.value })
                        } />
                    <label>Geo:</label>
                    <input name="latitude" placeholder="latitude" className="login-input" value={state.latitude}
                        onChange={(e) =>
                            dispatch({ type: "SET_FIELD", field: "latitude", value: e.target.value })
                        } />
                    <input name="longitude" placeholder="longitude" className="login-input" value={state.longitude}
                        onChange={(e) =>
                            dispatch({ type: "SET_FIELD", field: "longitude", value: e.target.value })
                        } />
                    <input name="phone" placeholder="phone" className="login-input" value={state.phone}
                        onChange={(e) =>
                            dispatch({ type: "SET_FIELD", field: "phone", value: e.target.value })
                        } />
                    <label>company</label>
                    <input name="companyname" placeholder="company name" className="login-input" value={state.companyName}
                        onChange={(e) =>
                            dispatch({ type: "SET_FIELD", field: "companyName", value: e.target.value })
                        } />
                    <input name="catchPhrase" placeholder="catchPhrase" className="login-input" value={state.catchPhrase}
                        onChange={(e) =>
                            dispatch({ type: "SET_FIELD", field: "catchPhrase", value: e.target.value })
                        } />

                    <input name="bs" placeholder="bs" className="login-input" value={state.bs} onChange={(e) =>
                        dispatch({ type: "SET_FIELD", field: "bs", value: e.target.value })
                    } />
                    <button className="login-button" type="button" onClick={addUser}>submit</button>
                </div>
            }
        </>
    )

}
export default Signup;