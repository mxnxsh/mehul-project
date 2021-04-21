import { NOTE_CREATE_FAIL, NOTE_CREATE_REQUEST, NOTE_CREATE_RESET, NOTE_CREATE_SUCCESS, NOTE_DELETE_FAIL, NOTE_DELETE_REQUEST, NOTE_DELETE_SUCCESS, NOTE_DETAIL_FAIL, NOTE_DETAIL_REQUEST, NOTE_DETAIL_SUCCESS, NOTE_LIST_FAIL, NOTE_LIST_REQUEST, NOTE_LIST_SUCCESS } from "../constants/noteConstants";

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

export const noteListReducer = (state = { notes: [] }, { type, payload }) => {
  switch (type) {
    case NOTE_LIST_REQUEST:
      return { loading: true, notes: [] }
    case NOTE_LIST_SUCCESS:
      return { loading: false, notes: payload }
    case NOTE_LIST_FAIL:
      return { loading: false, error: payload }
    default:
      return state;
  }
}
export const noteDeleteReducer = (state = { note: {} }, { type, payload }) => {
  switch (type) {
    case NOTE_DELETE_REQUEST:
      return { loading: true }
    case NOTE_DELETE_SUCCESS:
      return { loading: false, note: payload, success: true }
    case NOTE_DELETE_FAIL:
      return { loading: false, error: payload, success: false }
    default:
      return state;
  }
}
export const noteDetailReducer = (state = { note: {} }, { type, payload }) => {
  switch (type) {
    case NOTE_DETAIL_REQUEST:
      return { loading: true }
    case NOTE_DETAIL_SUCCESS:
      return { loading: false, note: payload, success: true }
    case NOTE_DETAIL_FAIL:
      return { loading: false, error: payload, success: false }
    default:
      return state;
  }
}