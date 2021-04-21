import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { noteCreateReducer, noteDeleteReducer, noteDetailReducer, noteListReducer } from './reducers/noteReducers';

import { userRegisterReducer, userSignInReducer } from './reducers/userReducers';


const initialState = {
  userSignIn: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
};

const reducer = combineReducers({
  userSignIn: userSignInReducer,
  userRegister: userRegisterReducer,

  Note: noteCreateReducer,
  noteList: noteListReducer,
  noteDelete: noteDeleteReducer,
  noteDetail: noteDetailReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;