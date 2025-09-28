import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

export default function Navbar() {
  return (
    <div>
       <nav className="navbar">
        <Link to={"/home"} className='logo'>Enjoy Media</Link>
        <div className="nav-links">
          <Link to={"/home"} className='nav-links-item'>Home</Link>
          <Link to={"/leaderboard"} className='nav-links-item'>Leaderboard</Link>
          <Link to={"/createpost"} className='nav-links-item'>Create Post</Link>
          <Link to={"/postlist"} className='nav-links-item'>PostList</Link>
        </div>
      </nav>
    </div>
  )
}
