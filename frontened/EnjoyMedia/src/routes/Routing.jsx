import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Signup from "../pages/signup/Signup";
import Login from "../pages/login/Login";
import Home from "../pages/home/Home";  
import ProtectedRoute from "../component/protectedroute/ProtectedRoute";
import Navbar from "../component/navbar/Navbar";
import LogoutButton from "../component/logout/LogoutButton";
import LeaderBoard from "../pages/leaderboard/LeaderBoard";
import CreatePost from "../pages/createpost/CreatePost";
import PostList from "../pages/postlist/PostList";



function AppContent() {
  const location = useLocation();
  
  // Hide navbar on signup and login pages
  const hideNavbar = location.pathname === '/' || location.pathname === '/login';
  
  return (
    <>
      {!hideNavbar && <Navbar />}
      {!hideNavbar && <LogoutButton />}
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home"  element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/leaderboard"  element={<ProtectedRoute><LeaderBoard /></ProtectedRoute>} />
        <Route path="/createpost"  element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
        <Route path="/postlist"  element={<ProtectedRoute><PostList /></ProtectedRoute>} />
        </Routes>
     
    </>
  );
}

export default function Routing() {
  return (
     <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
