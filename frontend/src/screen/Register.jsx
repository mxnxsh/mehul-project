import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function Register(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const userRegister = useSelector(state => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password and confirm password are not match');
    } else {
      dispatch(register(name, email, password));
    }
  };

  useEffect(() => {
    if (!userInfo) {
      props.history.push('/notes');
    }
  }, [userInfo, props.history]);

  return (
    <>
      <section id='navigation_bar'>
        <nav class='navbar navbar-expand-lg navbar-light main_navbar'>
          <div class='container home_container'>
            <img id='brand_icon' src='images/Notes_Outline.svg' alt='' />
            <a
              class='navbar-brand main_brand mr-auto'
              style={{ color: '#fff', fontSize: '28px' }}
              href='/'
            >
              Save Notes
            </a>
            <button
              class='navbar-toggler'
              type='button'
              data-toggle='collapse'
              data-target='#navbarSupportedContent'
              aria-controls='navbarSupportedContent'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <span class='navbar-toggler-icon'></span>
            </button>
          </div>
        </nav>
      </section>
      <section id='home'>
        <div class='jumbotron bg-white jb_tron mx-auto'>
          <h3 class='text-muted register_brand'>Save Notes</h3>
          <form onSubmit={submitHandler}>
            <div class='form-group'>
              <input
                type='hidden'
                name='originalOTP'
                value='<%=generatedOTP%>'
              />
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox varient='danger'>{error}</MessageBox>}
              <label for='Name'>Name</label>
              <input
                type='text'
                class='form-control'
                onChange={e => setName(e.target.value)}
              />
              <label for='InputEmail'>Email address</label>
              <input
                type='email'
                class='form-control'
                onChange={e => setEmail(e.target.value)}
              />

              <label for='InputPassword'>Password</label>
              <input
                type='password'
                class='form-control'
                onChange={e => setPassword(e.target.value)}
              />

              <label for='ConfirmPassword'>Confirm Password</label>
              <input
                type='password'
                class='form-control'
                onChange={e => setConfirmPassword(e.target.value)}
              />

              <small class='form-text text-muted'>
                We'll never share your details with anyone else.
              </small>
              <br />
              <button type='submit' class='btn btn-block btn-warning'>
                Generate OTP
              </button>

              {/* <small class="form-text text-muted">Use different method to sign-in.</small>
                            <a class="btn btn-block btn-social btn-google" href="/auth/google" role="button">
                                <i class="fab fa-google"></i>
                                Sign Up with Google
                            </a> */}
            </div>
          </form>
        </div>
      </section>
      <footer id='footer' class='footer-2'>
        <div class='footer-copyright'>
          <div class='container'>
            <div class='row'>
              <div class='col-md-12 text-center'>
                <p>Copyright Save Notes © 2021. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
