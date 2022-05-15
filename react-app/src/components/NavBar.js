import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './navbar.css'

const NavBar = () => {
  const user = useSelector(state => state.session.user)
  return (
    <nav className='navbar'>
      <ul className='list'>
        <li className='list'>
          <NavLink className='navLink' to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink className='navLink' to='/login' exact={true} activeClassName='active'>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink className='navLink' to='/sign-up' exact={true} activeClassName='active'>
                Sign Up
              </NavLink>
            </li>
          </>
        )}
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
