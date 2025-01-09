// import React, { useState, useReducer, useRef, useContext } from "react"
// import { useNavigate } from "react-router-dom";
// import '../css/login.css'
// import { userContext } from "./App";
// //check inputs- mybe useForm?
// // הגדרת פעולות שיכולות לקרות בטופס
// const initialState = {
//     // isSignedUp: false,
//     name: "",
//     email: "",
//     city: "",
//     suite: "",
//     street: "",
//     zipcode: "",
//     latitude: "",
//     longitude: "",
//     phone: "",
//     website: "",
//     companyName: "",
//     catchPhrase: "",
//     bs: ""
// };

// // פעולה לעדכון שדה
// const formReducer = (state, action) => {
//     switch (action.type) {
//         case "SET_FIELD":
//             return { ...state, [action.field]: action.value };
//         // case "SIGN_UP":
//         //     return { ...state, isSignedUp: true };
//         default:
//             return state;
//     }
// };
// function Signup({ usernameRef }) {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [verifyPassword, setverifyPassword] = useState('');
//     const [succsessfulSignUP, setSuccessfulSignUp] = useState(false);
//     const [state, dispatch] = useReducer(formReducer, initialState);
//     const { setUserData } = useContext(userContext);
//     const navigate = useNavigate();
//     async function startSignUp() {
//         if (password === verifyPassword) {
//             let response = await fetch(`http://localhost:3000/users/?website=${password}`);  // Make sure the endpoint matches your API
//             if (response.status >= 200 && response.status < 300) {
//                 let jsonRes = await response.json();
//                 if (jsonRes.length == 0) { setSuccessfulSignUp(true); }
//                 else {
//                     alert('User already exists');
//                 }
//             }
//         }
//         else alert('the two password fields arent equal')
//     }
//     async function addUser() {
//         const createUser = {
//             username: username,
//             name: state.name,
//             email: state.email,
//             address: {
//                 city: state.city,
//                 suite: state.suite,
//                 street: state.street,
//                 zipcode: state.zipcode,
//                 geo: {
//                     lat: state.latitude,
//                     lng: state.longitude
//                 }
//             },
//             phone: state.phone,
//             website: password,
//             company: {
//                 name: state.companyName,
//                 catchPhrase: state.catchPhrase,
//                 bs: state.bs
//             }
//         };

//         try {
//             const response = await fetch("http://localhost:3000/users", {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(createUser),
//             });
//             if (response.ok) {
//                 let createdUser = await response.json();
//                 setUserData(createUser);
//                 localStorage.setItem("currentUser", JSON.stringify(createdUser));
//                 navigate(`/home/users/${createdUser.id}`);

//             }

//         }
//         catch (ex) {

//         }
//     }
//     return (
//         <>
//             {!succsessfulSignUP &&
//                 <div className="login-container">
//                     <input name="username" placeholder="userName" className="login-input" ref={usernameRef} onChange={(e) => setUsername(e.target.value)} />
//                     <input name="password" placeholder="password" className="login-input" onChange={(e) => setPassword(e.target.value)} />
//                     <input name="verifyPassword" placeholder="password" className="login-input" onChange={(e) => setverifyPassword(e.target.value)} />
//                     <button type="button" className="login-button" onClick={startSignUp}>submit</button>
//                 </div>}
//             {
//                 succsessfulSignUP &&
//                 <div className="login-container">
//                     <input name="name" placeholder="name" className="login-input" value={state.name}
//                         onChange={(e) =>
//                             dispatch({ type: "SET_FIELD", field: "name", value: e.target.value })
//                         } />
//                     <input name="email" placeholder="email" className="login-input" value={state.email}
//                         onChange={(e) =>
//                             dispatch({ type: "SET_FIELD", field: "email", value: e.target.value })
//                         } />
//                     <label >address:</label>
//                     <input name="city" placeholder="city" className="login-input" value={state.city}
//                         onChange={(e) =>
//                             dispatch({ type: "SET_FIELD", field: "city", value: e.target.value })
//                         } />
//                     <input name="suite" placeholder="suite" className="login-input" value={state.suite}
//                         onChange={(e) =>
//                             dispatch({ type: "SET_FIELD", field: "suite", value: e.target.value })
//                         } />
//                     <input name="street" placeholder="street" className="login-input" value={state.street}
//                         onChange={(e) =>
//                             dispatch({ type: "SET_FIELD", field: "street", value: e.target.value })
//                         } />
//                     <input name="zipcode" placeholder="zipcode" className="login-input" value={state.zipcode}
//                         onChange={(e) =>
//                             dispatch({ type: "SET_FIELD", field: "zipcode", value: e.target.value })
//                         } />
//                     <label>Geo:</label>
//                     <input name="latitude" placeholder="latitude" className="login-input" value={state.latitude}
//                         onChange={(e) =>
//                             dispatch({ type: "SET_FIELD", field: "latitude", value: e.target.value })
//                         } />
//                     <input name="longitude" placeholder="longitude" className="login-input" value={state.longitude}
//                         onChange={(e) =>
//                             dispatch({ type: "SET_FIELD", field: "longitude", value: e.target.value })
//                         } />
//                     <input name="phone" placeholder="phone" className="login-input" value={state.phone}
//                         onChange={(e) =>
//                             dispatch({ type: "SET_FIELD", field: "phone", value: e.target.value })
//                         } />
//                     <label>company</label>
//                     <input name="companyname" placeholder="company name" className="login-input" value={state.companyName}
//                         onChange={(e) =>
//                             dispatch({ type: "SET_FIELD", field: "companyName", value: e.target.value })
//                         } />
//                     <input name="catchPhrase" placeholder="catchPhrase" className="login-input" value={state.catchPhrase}
//                         onChange={(e) =>
//                             dispatch({ type: "SET_FIELD", field: "catchPhrase", value: e.target.value })
//                         } />

//                     <input name="bs" placeholder="bs" className="login-input" value={state.bs} onChange={(e) =>
//                         dispatch({ type: "SET_FIELD", field: "bs", value: e.target.value })
//                     } />
//                     <button className="login-button" type="button" onClick={addUser}>submit</button>
//                 </div>
//             }
//         </>
//     )

// }
// export default Signup;
import React, { useState, useReducer, useRef, useContext } from "react"
import { useNavigate } from "react-router-dom";
import '../css/login.css'
import { userContext } from "./App";

const initialState = {
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

const formReducer = (state, action) => {
    switch (action.type) {
        case "SET_FIELD":
            return { ...state, [action.field]: action.value };
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
    const [errors, setErrors] = useState({});
    const { setUserData } = useContext(userContext);
    const navigate = useNavigate();

    const validateField = (name, value) => {
        switch(name) {
            case 'username':
                return value.length >= 3 ? '' : 'Username must contain at least 3 characters';
            case 'email':
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email format';
            case 'phone':
                return /^[0-9\-\+]{9,}$/.test(value) ? '' : 'Invalid phone number';
            case 'zipcode':
                return /^[0-9\-]{5,}$/.test(value) ? '' : 'Invalid zipcode';
            case 'name':
                return value.length >= 2 ? '' : 'Name is required';
            case 'city':
                return value.length >= 2 ? '' : 'City is required';
            case 'street':
                return value.length >= 2 ? '' : 'Street is required';
            case 'latitude':
                return /^-?([0-8]?[0-9]|90)(\.[0-9]+)?$/.test(value) ? '' : 'Invalid latitude (-90 to 90)';
            case 'longitude':
                return /^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]+)?$/.test(value) ? '' : 'Invalid longitude (-180 to 180)';
            case 'companyName':
                return value.length >= 2 ? '' : 'Company name is required';
            default:
                return '';
        }
    };

    const handleInputChange = (e, field) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setErrors(prev => ({...prev, [name]: error}));
        dispatch({ type: "SET_FIELD", field, value });
    };

    async function startSignUp() {
        if (password === verifyPassword) {
            let response = await fetch(`http://localhost:3000/users/?website=${password}`);
            if (response.status >= 200 && response.status < 300) {
                let jsonRes = await response.json();
                if (jsonRes.length == 0) {
                    setSuccessfulSignUp(true);
                } else {
                    alert('User already exists');
                }
            }
        } else {
            alert('Passwords do not match');
        }
    }

    async function addUser() {
        const formErrors = {};
        Object.keys(state).forEach(key => {
            const error = validateField(key, state[key]);
            if (error) formErrors[key] = error;
        });

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

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
                navigate(`/home`);
            }
        } catch (ex) {
            console.error("Error creating user:", ex);
        }
    }

    return (
        <>
            {!succsessfulSignUP && (
                <div className="login-container">
                    <input 
                        type="text" 
                        name="username" 
                        pattern="[A-Za-z0-9]+" 
                        placeholder="Username" 
                        className="login-input" 
                        required
                        ref={usernameRef}
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    {errors.username && <span className="error-message">{errors.username}</span>}
                    
                    <input 
                        type="password" 
                        name="password" 
                        minLength="6"
                        placeholder="Password" 
                        className="login-input" 
                        required
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    
                    <input 
                        type="password" 
                        name="verifyPassword" 
                        minLength="6"
                        placeholder="Verify Password" 
                        className="login-input" 
                        required
                        onChange={(e) => setverifyPassword(e.target.value)} 
                    />
                    
                    <button type="button" className="login-button" onClick={startSignUp}>Submit</button>
                </div>
            )}

            {succsessfulSignUP && (
                <div className="login-container">
                    <input 
                        type="text"
                        pattern="[A-Za-z\s]+"
                        name="name" 
                        placeholder="Name" 
                        className="login-input" 
                        required
                        value={state.name}
                        onChange={(e) => handleInputChange(e, "name")}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}

                    <input 
                        type="email"
                        name="email" 
                        placeholder="Email" 
                        className="login-input" 
                        required
                        value={state.email}
                        onChange={(e) => handleInputChange(e, "email")}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}

                    <label>Address:</label>
                    <input 
                        type="text"
                        pattern="[A-Za-z\s]+"
                        name="city" 
                        placeholder="City" 
                        className="login-input" 
                        required
                        value={state.city}
                        onChange={(e) => handleInputChange(e, "city")}
                    />
                    {errors.city && <span className="error-message">{errors.city}</span>}

                    <input 
                        type="text"
                        name="suite" 
                        placeholder="Suite" 
                        className="login-input" 
                        value={state.suite}
                        onChange={(e) => handleInputChange(e, "suite")}
                    />

                    <input 
                        type="text"
                        name="street" 
                        placeholder="Street" 
                        className="login-input" 
                        required
                        value={state.street}
                        onChange={(e) => handleInputChange(e, "street")}
                    />
                    {errors.street && <span className="error-message">{errors.street}</span>}

                    <input 
                        type="text"
                        pattern="[0-9\-]+"
                        name="zipcode" 
                        placeholder="Zipcode" 
                        className="login-input" 
                        required
                        value={state.zipcode}
                        onChange={(e) => handleInputChange(e, "zipcode")}
                    />
                    {errors.zipcode && <span className="error-message">{errors.zipcode}</span>}

                    <label>Geo:</label>
                    <input 
                        type="number"
                        step="any"
                        name="latitude" 
                        placeholder="Latitude" 
                        className="login-input" 
                        required
                        value={state.latitude}
                        onChange={(e) => handleInputChange(e, "latitude")}
                    />
                    {errors.latitude && <span className="error-message">{errors.latitude}</span>}

                    <input 
                        type="number"
                        step="any"
                        name="longitude" 
                        placeholder="Longitude" 
                        className="login-input" 
                        required
                        value={state.longitude}
                        onChange={(e) => handleInputChange(e, "longitude")}
                    />
                    {errors.longitude && <span className="error-message">{errors.longitude}</span>}

                    <input 
                        type="tel"
                        pattern="[0-9\-\+]+"
                        name="phone" 
                        placeholder="Phone" 
                        className="login-input" 
                        required
                        value={state.phone}
                        onChange={(e) => handleInputChange(e, "phone")}
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}

                    <label>Company</label>
                    <input 
                        type="text"
                        name="companyName" 
                        placeholder="Company Name" 
                        className="login-input" 
                        required
                        value={state.companyName}
                        onChange={(e) => handleInputChange(e, "companyName")}
                    />
                    {errors.companyName && <span className="error-message">{errors.companyName}</span>}

                    <input 
                        type="text"
                        name="catchPhrase" 
                        placeholder="Catch Phrase" 
                        className="login-input" 
                        value={state.catchPhrase}
                        onChange={(e) => handleInputChange(e, "catchPhrase")}
                    />

                    <input 
                        type="text"
                        name="bs" 
                        placeholder="Business" 
                        className="login-input" 
                        value={state.bs} 
                        onChange={(e) => handleInputChange(e, "bs")}
                    />

                    <button className="login-button" type="button" onClick={addUser}>Submit</button>
                </div>
            )}
        </>
    );
}

export default Signup;
