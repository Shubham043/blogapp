import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/" className="nav-link">Logout</Link>
        </li>
        <li>
          <Link to="/bloglist" className="nav-link">YourBlogs</Link>
        </li>
        <li>
          <Link to="/postform" className="nav-link">Post Form</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
