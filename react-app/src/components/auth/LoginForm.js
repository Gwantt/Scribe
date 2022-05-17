import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './loginForm.css'
import './feather.png'
import {AiOutlineTeam} from 'react-icons/ai'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='bodyWrapper'>
      <div className='logWrapper'>
        <div className='logForm'>
          <form className='mainForm' onSubmit={onLogin}>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <img src='https://res.cloudinary.com/daeopbcax/image/upload/v1652739383/feather/feather_cunzre.png' alt='logo'/>
            <h1>Scribe</h1>
            <p style={{fontSize:'11px'}}>Keep track of whats important.</p>
            <div>
              <button className='demoButton'  onClick={async() => await dispatch(login('demo@aa.io', 'password'))}><AiOutlineTeam /> Continue as Demo</button>
            </div>
            <div>
              <div style={{marginBottom: '6px', fontSize: '.75rem', color:'#ababab'}}>
                or
              </div>
            </div>
            <div>
              <input
                name='email'
                type='text'
                placeholder='Email'
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div>
              <input
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={updatePassword}
              />
            </div>
            <button type='submit'>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
