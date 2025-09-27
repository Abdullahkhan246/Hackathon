import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "../pages/signup/Signup";
import Login from "../pages/login/Login";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import ProtectedRoute from "../component/protectedroute/ProtectedRoute";
import Navbar from "../component/navbar/Navbar";


export default function Routing() {
  return (
     <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home"  element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/about" element={<About />} />
    
      </Routes>
    </BrowserRouter>
  )
}
