import React, { useContext,useEffect } from "react";
import { Routes, Route, Link, Outlet,useParams ,useNavigate} from "react-router-dom";
import UserData from "./UserData";
import Posts from "./Posts";
import Todos from "./todos";
import Albums from "./Albums";
import { userContext } from "./App";
function UserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
   const {userData} =useContext(userContext);
   useEffect(()=>{if (userData?.id !== id) {
    //localStorage.remonnnnveItem("currentUser"); // Clear the current user
    navigate("/login", { replace: true }); // Redirect to the login page
  }},[id])
  return (
    <>
      <nav>
        <Link to={`/home/users/${id}/info`}>info</Link>
        <Link to={`/home/users/${id}/posts`}>posts</Link>
        <Link to={`/home/users/${id}/todos`}>todos</Link>
        <Link to={`/home/users/${id}/albums`}>albums</Link>
        <Link to="/login" onClick={()=>localStorage.removeItem("currentUser")}>logout</Link>
      </nav>
      <Routes>
        <Route path="info" element={<UserData id={id} />} />
        <Route path="posts" element={<Posts id={id}/>} />
        <Route path="posts/:postid/*" element={<Posts />} />
        <Route path="todos" element={<Todos id={id}/>} />
        <Route path="albums/*" element={<Albums id={id}/>} />
        <Route path="" element={<h2>Welcome to {userData.username}'s Dashboard</h2>} />
        <Route path="*" element={<h2>Sub-Page Not Found</h2>} />
      </Routes>
      <Outlet />
    </>
  )
}
export default UserPage;