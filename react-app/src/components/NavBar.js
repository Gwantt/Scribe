import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './navbar.css'
import {BsHouseDoorFill} from 'react-icons/bs'


const NavBar = () => {
  const user = useSelector(state => state.session.user)
  const notebooks = useSelector(state => state.notebooks)
  const notebookArr = Object.values(notebooks)
  return (
    <nav style={{position:'absolute', zIndex:'210203123'}} className='navbar'>
      <ul className='list'>
        <li className='list'>
          <NavLink style={{color:'#babac0'}} className='navLink' to='/' exact={true} activeClassName='active'>
            <BsHouseDoorFill />
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
        {/* <li>
          <details>
            <summary className='sum'>Notebooks</summary>
            <ul>
              {notebookArr && notebookArr.map(notebook => (
                <li style={{ listStyle:'none', position:'relative', zIndex:"1000000"}}><NavLink to={`/notebook/${notebook.id}`}>{notebook.title}</NavLink></li>
              ))}
            </ul>
          </details>
        </li> */}
        <li className='list'>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
