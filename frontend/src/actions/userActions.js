import Axios from 'axios';

import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,

} from "../constants/userConstants"

export const signIn = (email, password) => async (dispatch) => {
  dispatch({
    type: USER_SIGNIN_REQUEST,
    payload: {
      email, password
    }
  })
  try {
    const { data } = await Axios.post('/api/users/signin', { email, password })
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));

  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message
    dispatch({ type: USER_SIGNIN_FAIL, payload: message })
  }
}

export const register = (name, email, password) => async (dispatch) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
    payload: {
      name,
      email,
      password
    }
  });
  try {
    const { data } = await Axios.post('/api/users/register', {
      name,
      email,
      password,
    });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: message
    });
  }
};

export const signOut = () => async (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_SIGNOUT });
  document.location.href = '/signin';
}