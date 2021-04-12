import Axios from "axios";
import { NOTE_CREATE_FAIL, NOTE_CREATE_REQUEST, NOTE_CREATE_SUCCESS, NOTE_DELETE_FAIL, NOTE_DELETE_REQUEST, NOTE_DELETE_SUCCESS, NOTE_LIST_FAIL, NOTE_LIST_REQUEST, NOTE_LIST_SUCCESS } from "../constants/noteConstants";

export const createNote = ({ title, description }) => async (dispatch, getState) => {
  try {
    const {
      userSignIn: {
        userInfo: { token },
      },
    } = getState();
    dispatch({ type: NOTE_CREATE_REQUEST });
    const { data } = await Axios.post('/api/notes', { title, description }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    );
    dispatch({
      type: NOTE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message
    dispatch({
      type: NOTE_CREATE_FAIL,
      payload: message
    });
  }
}
export const listNote = () => async (dispatch, getState) => {
  try {
    dispatch({ type: NOTE_LIST_REQUEST })
    const {
      userSignIn: {
        userInfo: { token },
      },
    } = getState();
    const { data } = await Axios.get('/api/notes', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    dispatch({ type: NOTE_LIST_SUCCESS, payload: data })
  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message
    dispatch({ type: NOTE_LIST_FAIL, payload: message })
  }
}

export const deleteNote = (_id) => async (dispatch, getState) => {
  try {
    dispatch({ type: NOTE_DELETE_REQUEST, payload: _id })
    const {
      userSignIn: {
        userInfo: { token },
      },
    } = getState(); const { data } = await Axios.delete('/api/notes/' + _id, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    dispatch({ type: NOTE_DELETE_SUCCESS, payload: data })
  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message
    dispatch({ type: NOTE_DELETE_FAIL, payload: message })
  }
}