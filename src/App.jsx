import React ,{useRef} from "react";
import { BrowserRouter as Router, Routes, Navigate, Route, Link } from "react-router-dom";
import Login from "./components/login";
import Signup from './components/Signup';
import UserPage from './components/UserPage';
//import GeneralDisplay from "./components/GeneralRequests";
import './App.css';

function App() {
  const usernameRef = useRef("user");
  return (
    <Router>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/signup">SignUp</Link>
      </nav>
      <Routes >
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path='/login' element={<Login usernameRef={usernameRef}/>} />
        <Route path='/signup' element={<Signup usernameRef={usernameRef}/>} />
        <Route path='/home/users/:id/*' element={<UserPage username={usernameRef.current}/>}>
        </Route>
        <Route path="*" element={<h1>404: Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
