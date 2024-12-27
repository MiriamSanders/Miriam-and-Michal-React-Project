import { BrowserRouter as Router, Routes, Navigate, Route, Link } from "react-router-dom";
import Login from "./components/login";
import Signup from './components/Signup';
import UserPage from './components/UserPage';
//import GeneralDisplay from "./components/GeneralRequests";
import './App.css';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/signup">SignUp</Link>
      </nav>
      <Routes >
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home/users/:id/*' element={<UserPage />}>
        </Route>
        <Route path="*" element={<h1>404: Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
