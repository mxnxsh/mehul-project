import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { signIn } from '../actions/userActions';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userSignIn = useSelector(state => state.userSignIn);
  const { userInfo, loading, error } = userSignIn;

  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(signIn(email, password));
  };

  useEffect(() => {
    if (userInfo) {
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
      <section class='container'>
        <div class='jumbotron bg-white jb_tron mx-auto'>
          <h3 class='text-muted register_brand'>Save Notes</h3>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox varient='danger'>{error}</MessageBox>}
          <form onSubmit={submitHandler}>
            <div class='form-group'>
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
              <br />
              <button type='submit' class='btn btn-warning btn-block'>
                Login
              </button>

              {/* <small class="form-text text-muted">Use different method to login.</small>
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
