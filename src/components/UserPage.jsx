import React,{useEffect,useState} from "react"
import {  Routes, Route, Link,Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import GenaralDisplay from "./GeneralDisplay";
import UserData from "./UserData";
function UserPage()
{
    const { id } = useParams();
  
    return(
    <>
      <nav>
        <Link to={`/home/users/${id}/info`}>info</Link>
        <Link to={`/home/users/${id}/posts`}>posts</Link>
        <Link to={`/home/users/${id}/todos`}>todos</Link>
        <Link to={`/home/users/${id}/albums`}>albums</Link>
        <Link to="/home/login">logout</Link>
      </nav>
      <Routes>
        <Route path="info" element={<UserData id={id}/>} />
        <Route path="posts/*" element={<GenaralDisplay id={id} typeOfItem="posts"/>} />
        <Route path="todos" element={<GenaralDisplay id={id} typeOfItem="todos"/>} />
        <Route path="albums/*" element={<GenaralDisplay id={id} typeOfItem="albums" />} />
        <Route path="" element={<h2>Welcome to the User Dashboard</h2>} />
        <Route path="*" element={<h2>Sub-Page Not Found</h2>} /> 
      </Routes> 
      <Outlet/>
  </>
    )
}
export default UserPage;