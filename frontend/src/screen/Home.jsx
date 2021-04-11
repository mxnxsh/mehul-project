import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function Home(props) {
  const userSignIn = useSelector(state => state.userSignIn);
  const { userInfo } = userSignIn;
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
      <section id='home'>
        <div class='container mt-5 pt-5'>
          <div class='row'>
            <div class='col-md-6 home_left'>
              <h1>Premium notes creator. Now free for everyone.</h1>
              <h2>
                We re-develope the service we built the secure platform, Save
                Notes, to make it free and available for all.
              </h2>
              <div class='home_authenticate'>
                <a href='/signin' type='button' class='btn btn_login'>
                  Login
                </a>
                <span>&nbsp;OR&nbsp;</span>
                <a
                  href='/register'
                  type='button'
                  class='btn btn_register btn-outline-warning'
                >
                  Register
                </a>
              </div>
              <hr />
            </div>
            <div class='col-md-6'>
              <img
                src='images/Notes_Monochromatic.svg'
                class='rounded ml-auto d-block'
                alt='...'
              />
            </div>
          </div>
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
