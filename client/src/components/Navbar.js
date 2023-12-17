// Navbar.js

import React, { useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link, NavLink } from 'react-router-dom';
import { LoginContext } from './ContextProvider/Context';
import { useNavigate } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const { logindata, setLoginData } = useContext(LoginContext);
  const history = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutUser = async () => {
    try {
      let token = localStorage.getItem('usersdatatoken');
      const res = await fetch('/logout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
          Accept: 'application/json',
        },
        credentials: 'include',
      });

      const data = await res.json();

      if (data.status === 201) {
        localStorage.removeItem('usersdatatoken');
        setLoginData(false);
        history('/');
      } else {
        console.log('Error logging out');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const goProfile = () => {
    history('/profile');
  };

  const goError = () => {
    history('*');
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <h2>Construction Professional's Nepal</h2>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            
            <li className="nav-item">
              <NavLink className="nav-link" to="/professional">
                Professional
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/design">
                Design
              </NavLink>
            </li>
            <li className="nav-item">
              <a
                className="nav-link disabled"
                href="*"
                tabIndex="-1"
                aria-disabled="true"
              >
                Cart
              </a>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>

          </ul>
        </div>

        <div className="avatar">
          {logindata.ValidUserOne ? (
            <Avatar style={{ background: 'blue' }} onClick={handleClick}>
              {logindata.ValidUserOne.uname
                ? logindata.ValidUserOne.uname[0].toUpperCase()
                : 'C'}
            </Avatar>
          ) : (
            <Avatar style={{ background: 'blue' }} onClick={handleClick} />
          )}
        </div>

        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          {logindata.ValidUserOne ? (
            <>
              <MenuItem
                onClick={() => {
                  goProfile();
                  handleClose();
                }}
              >
                Profile
              </MenuItem>

              <MenuItem
                onClick={() => {
                  logoutUser();
                  handleClose();
                }}
              >
                Logout
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem
                onClick={() => {
                  goError();
                  handleClose();
                }}
              >
                Profile
              </MenuItem>
            </>
          )}
        </Menu>
      </nav>
    </header>
  );
};

export default Navbar;
