import React from 'react'
import { NavLink } from 'react-router-dom'

const ProfessNav = () => {
  return (
    <div>
       <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <h2>Construction Professional's Nepal</h2>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/my-designs">
              My Designs
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/add-designs">
              Add Designs
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </li>
        </ul>
      </div>

      

      
    </nav>

    </div>
  )
}

export default ProfessNav
