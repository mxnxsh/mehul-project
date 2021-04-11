import Axios from "axios";
import { NOTE_CREATE_FAIL, NOTE_CREATE_REQUEST, NOTE_CREATE_SUCCESS } from "../constants/noteConstants";

export const createNote = ({ title, description }) => async (dispatch, getState) => {
  try {
    const {
      userSignIn: {
        userInfo: { token, _id },
      },
    } = getState();
    dispatch({ type: NOTE_CREATE_REQUEST });
    const { data } = await Axios.post('/api/notes', { title, description, user: _id }, {
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