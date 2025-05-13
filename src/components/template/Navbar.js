import React from 'react';
import { useAuth } from '../../auth-context';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const signout = () => {
    logout();
    navigate('/login');
  }
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              <i className="fas fa-bars"></i> {/* Hamburger menu */}
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/settings" className="nav-link">Settings</Link>
          </li>
        </ul>

        {/* Navbar Right Side */}
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown">
            <a
              className="nav-link"
              data-toggle="dropdown"
              href="#"
            >
              <i className="fas fa-user"></i> {/* User Icon */}
              <span className="d-none d-md-inline">Profile</span>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <a className="dropdown-item">
                <i className="fas fa-cogs"></i> Settings
              </a>
              <a onClick={signout} className='dropdown-item'>
                <i className='fas fa-sign-out-alt'></i> Logout
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
