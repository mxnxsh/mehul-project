import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { createNote, deleteNote, listNote } from '../actions/noteActions';
import { signOut } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function Notes(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const userSignIn = useSelector(state => state.userSignIn);
  const { userInfo } = userSignIn;

  const noteList = useSelector(state => state.noteList);
  const { loading, notes, error } = noteList;

  const Note = useSelector(state => state.Note);
  const { success } = Note;

  const noteDelete = useSelector(state => state.noteDelete);
  const { success: successDelete } = noteDelete;

  const dispatch = useDispatch();

  const signOutHandler = () => {
    dispatch(signOut());
  };
  const saveNoteHandler = e => {
    e.preventDefault();
    dispatch(createNote({ title, description }));
    setTitle('');
    setDescription('');
  };
  const deleteHandler = _id => {
    dispatch(deleteNote(_id));
  };
  const editHandler = _id => {
    console.log(_id);
  };
  useEffect(() => {
    dispatch(listNote());
  }, [dispatch, success, successDelete]);

  return (
    <>
      <section id='navigation_bar'>
        <nav class='navbar navbar-expand-lg navbar-light main_navbar'>
          <div class='container home_container'>
            <img id='brand_icon' src='images/Notes_Outline.svg' alt='' />
            <a
              class='navbar-brand main_brand'
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

            <div class='collapse navbar-collapse' id='navbarSupportedContent'>
              <ul class='navbar-nav ml-auto nav_widgets'>
                <li class='nav-item dropdown'>
                  <a
                    class='nav-link dropdown-toggle'
                    href='/'
                    id='navbarDropdown'
                    role='button'
                    data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                  >
                    <img
                      src=''
                      class='profile_picture'
                      alt={`${userInfo.name[0]}`}
                    />
                  </a>
                  <div class='dropdown-menu' aria-labelledby='navbarDropdown'>
                    <a class='dropdown-item' href='/'>
                      {userInfo.name}
                    </a>
                    <div class='dropdown-divider'></div>
                    <Link
                      class='dropdown-item'
                      to='#signout'
                      onClick={signOutHandler}
                    >
                      Log Out
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </section>

      <section id='add_new'>
        <div class='container' data-toggle='modal' data-target='#exampleModal'>
          <div class='jumbotron bg-white jb_tron2'>
            <div class='add_note'>
              <ul class='nav'>
                <li class='nav-item'>
                  <h2 class='m-0 nav-link'>Add new notes....</h2>
                </li>
                <li class='nav-item ml-auto'>
                  <h3 class='nav-link'>
                    <i class='fas fa-plus-circle'></i>
                  </h3>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Modal --> */}
      <div
        class='modal fade'
        id='exampleModal'
        tabindex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div class='modal-dialog'>
          <div class='modal-content'>
            <form onSubmit={saveNoteHandler}>
              <div class='modal-header note_header'>
                <input type='hidden' name='google_id' value='<%=googleId%>' />
                <div class='form-group'>
                  <input
                    type='text'
                    name='note_title'
                    placeholder='Title....'
                    class='form-control note_title'
                    id='exampleInputEmail1'
                    value={title}
                    aria-describedby='emailHelp'
                    onChange={e => setTitle(e.target.value)}
                  />
                </div>

                <button
                  type='button'
                  class='close'
                  data-dismiss='modal'
                  aria-label='Close'
                >
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div class='modal-body'>
                <div class='form-group'>
                  <textarea
                    name='main_note'
                    placeholder='Add note....'
                    value={description}
                    class='form-control note_descreption'
                    id='exampleFormControlTextarea1'
                    rows='3'
                    onChange={e => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div class='modal-footer'>
                <button
                  type='button'
                  class='btn btn-secondary'
                  data-dismiss='modal'
                >
                  Cancel
                </button>
                <button type='submit' class='btn btn_save'>
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class='container pt-5'>
        <div class='row'>
          {loading && <LoadingBox />}
          {error && <MessageBox variant='danger'>{error}</MessageBox>}
          {notes.length === 0 ? (
            <p class='center '>No Notes created</p>
          ) : (
            notes.map(note => (
              <div
                class='col-md-3'
                onDoubleClick={() => {
                  deleteHandler(note._id);
                }}
                onClick={() => {
                  editHandler(note._id);
                }}
              >
                <div
                  class='card mb-2 d-block mx-auto'
                  style={{ width: '15rem' }}
                >
                  <div class='card-body'>
                    <h5 class='card-title'>{note.title}</h5>
                    <p class='card-text'>
                      {note.description}
                      <Link
                        to={`/notes/${note._id}`}
                        // onClick={() => {
                        //   props.history.push(`/order/${order._id}`);
                        // }}
                      >
                        Read more
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
