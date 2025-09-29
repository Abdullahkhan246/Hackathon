import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
       <nav className="navbar">
        <Link to={"/home"} className='logo'>Enjoy Media</Link>
        
        {/* Hamburger menu button */}
        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        {/* Navigation links with responsive class */}
        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <Link to={"/home"} className='nav-links-item' onClick={toggleMenu}>Home</Link>
          <Link to={"/leaderboard"} className='nav-links-item' onClick={toggleMenu}>Leaderboard</Link>
          <Link to={"/createpost"} className='nav-links-item' onClick={toggleMenu}>Create Post</Link>
          <Link to={"/postlist"} className='nav-links-item' onClick={toggleMenu}>PostList</Link>
        </div>
      </nav>
    </div>
  )
}
