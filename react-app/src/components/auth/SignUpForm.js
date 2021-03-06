import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { login } from '../../store/session';
import { AiOutlineTeam } from 'react-icons/ai'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['Please make sure passwords are matching'])
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='bodyWrapper'>
      <div className='logWrapper'>
        <div className='logForm'>
          <div style={{ marginBottom: '10px' }}>
            {errors.map((error, ind) => (
              <div key={ind} style={{ color: 'red', fontWeight: 'bold' }}>{error}</div>
            ))}
          </div>
          <div className='mainForm'>
            <img style={{ height: '20%' }} src='https://res.cloudinary.com/daeopbcax/image/upload/v1652739383/feather/feather_cunzre.png' alt='logo' />
            <h1>Scribe</h1>
            <p style={{ fontSize: '11px', marginBottom: '10px', marginTop: '10px' }}>Keep track of whats important.</p>
          </div>
          <div className='mainForm'>
            <button className='demoButton' onClick={async () => await dispatch(login('demo@aa.io', 'password'))}><AiOutlineTeam /> Continue as Demo</button>
          </div>
          <form className='mainForm' onSubmit={onSignUp}>
            <div>
              <div style={{ marginBottom: '6px', fontSize: '.75rem', color: '#ababab' }}>
                or
              </div>
            </div>
            <div>
              <input
                type='text'
                name='username'
                placeholder='Username'
                onChange={updateUsername}
                value={username}
              ></input>
            </div>
            <div>
              <input
                type='text'
                name='email'
                placeholder='Email'
                onChange={updateEmail}
                value={email}
              ></input>
            </div>
            <div>
              <input
                type='password'
                name='password'
                placeholder='Password'
                onChange={updatePassword}
                value={password}
              ></input>
            </div>
            <div>
              <input
                type='password'
                name='repeat_password'
                placeholder='Confirm Password'
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              ></input>
            </div>
            <button type='submit'>Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
