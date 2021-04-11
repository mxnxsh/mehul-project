import { NOTE_CREATE_FAIL, NOTE_CREATE_REQUEST, NOTE_CREATE_RESET, NOTE_CREATE_SUCCESS } from "../constants/noteConstants";

export const noteCreateReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case NOTE_CREATE_REQUEST:
      return { loading: true };
    case NOTE_CREATE_SUCCESS:
      return { loading: false, product: payload, success: true };
    case NOTE_CREATE_FAIL:
      return { loading: false, error: payload };
    case NOTE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};