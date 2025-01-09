// import React, { useContext, useEffect } from "react";
// import { Routes, Route, Link, Outlet, useParams, useNavigate } from "react-router-dom";
// import UserData from "./UserData";
// import Posts from "./Posts";
// import Todos from "./todos";
// import Albums from "./Albums";
// import { userContext } from "./App";

// function UserPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { userData, setUserData } = useContext(userContext);

//   useEffect(() => {
//     if (userData?.id !== id) {
//       navigate("/login", { replace: true });
//     }
//   }, [id, userData, navigate]);

//   return (
//     <>
//       <div className="nav-container">
//         <nav className="left-nav">
//           <Link to={`/home/users/${id}/info`}>Info</Link>
//         </nav>
//         <nav className="center-nav">
//           <Link to={`/home/users/${id}/posts`}>Posts</Link>
//           <span className="separator"></span>
//           <Link to={`/home/users/${id}/todos`}>Todos</Link>
//           <span className="separator"></span>
//           <Link to={`/home/users/${id}/albums`}>Albums</Link>
//         </nav>
//         <nav className="right-nav">
//           <Link
//             to="/login"
//             onClick={() => {
//               localStorage.removeItem("currentUser");
//               setUserData(null);
//             }}
//           >
//             Logout
//           </Link>
//         </nav>
//       </div>
//       <Routes>
//         <Route path="info" element={<UserData id={id} />} />
//         <Route path="posts" element={<Posts id={id} />} />
//         <Route path="posts/:postid/*" element={<Posts />} />
//         <Route path="todos" element={<Todos id={id} />} />
//         <Route path="albums/*" element={<Albums id={id} />} />
//         <Route path="" element={<h2>Welcome to {userData?.username || "User"}'s Dashboard</h2>} />
//         <Route path="*" element={<h2>Sub-Page Not Found</h2>} />
//       </Routes>
//       <Outlet />
//     </>
//   );
// }

// export default UserPage;
import React, { useContext, useEffect } from "react";
import { Routes, Route, Link, Outlet, useParams, useNavigate } from "react-router-dom";
import UserData from "./UserData";
import Posts from "./Posts";
import Todos from "./todos";
import Albums from "./Albums";
import { userContext } from "./App";

function UserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(userContext);

  useEffect(() => {
    if (id&&userData?.id !== id) {
      navigate("/login", { replace: true });
    }
  }, [id, userData, navigate]);

  return (
    <>
      <div className="nav-container">
        <nav className="left-nav">
          <Link to={`/users/${userData.id}/info`}>Info</Link>
        </nav>
        <nav className="center-nav">
          <Link to={`/users/${userData.id}/posts`}>Posts</Link>
          <span className="separator"></span>
          <Link to={`/users/${userData.id}/todos`}>Todos</Link>
          <span className="separator"></span>
          <Link to={`/users/${userData.id}/albums`}>Albums</Link>
        </nav>
        <nav className="right-nav">
          <Link
            to="/login"
            onClick={() => {
              localStorage.removeItem("currentUser");
              setUserData(null);
            }}
          >
            Logout
          </Link>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<h2>Welcome to {userData?.username || "User"}'s Dashboard</h2>} />
        <Route path="/info" element={<UserData id={userData.id} />} />
        <Route path="/posts" element={<Posts id={userData.id} />} />
        <Route path="/posts/:postid/*" element={<Posts />} />
        <Route path="/todos" element={<Todos id={userData.id} />} />
        <Route path="/albums/*" element={<Albums id={userData.id} />} />
        <Route path="*" element={<h2>Sub-Page Not Found</h2>} />
      </Routes>
      <Outlet />
    </>
  );
}

export default UserPage;
