import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailNote, deleteNote } from '../actions/noteActions';
import { Link } from 'react-router-dom';
export default function ReadNote(props) {
  const noteId = props.match.params.id;

  const noteDetail = useSelector(state => state.noteDetail);
  const { loading, error, note } = noteDetail;

  const noteDelete = useSelector(state => state.noteDelete);
  const { success: successDelete } = noteDelete;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailNote(noteId));
  }, [dispatch, noteId]);
  const deleteHandler = _id => {
    dispatch(deleteNote(_id));
    props.history.push('/notes');
  };
  return (
    <>
      <section id='navigation_bar'>
        <nav class='navbar navbar-expand-lg navbar-light main_navbar'>
          <div class='container home_container'>
            <img id='brand_icon' src='/images/Notes_Outline.svg' alt='' />
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
                      src='<%= profilePicture %>'
                      class='profile_picture'
                      alt=''
                    />
                  </a>
                  <div class='dropdown-menu' aria-labelledby='navbarDropdown'>
                    <a class='dropdown-item' href='/'>
                      {/* <%= userName %> */}
                    </a>
                    <a
                      class='dropdown-item'
                      href='/'
                      data-toggle='modal'
                      data-target='#exampleModal'
                    >
                      Add new note
                    </a>
                    <div class='dropdown-divider'></div>
                    <a class='dropdown-item' href='/logout'>
                      Log Out
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </section>

      <div
        class='modal fade'
        id='exampleModal'
        tabindex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div class='modal-dialog'>
          <div class='modal-content'>
            <form action='/notes' method='POST'>
              <div class='modal-header note_header'>
                <input type='hidden' name='google_id' value='<%=googleId%>' />

                <div class='form-group'>
                  <input
                    type='text'
                    name='note_title'
                    placeholder='Title....'
                    class='form-control note_title'
                    id='exampleInputEmail1'
                    aria-describedby='emailHelp'
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
                    class='form-control note_descreption'
                    id='exampleFormControlTextarea1'
                    rows='3'
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

      <section id='text_note'>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant='danger'>{error}</MessageBox>
        ) : (
          <div class='container'>
            <div class='bg-white note_jb_tron mx-auto'>
              <h2>{note.title}</h2>
              <p>{note.description}</p>
              <div class='float-right'>
                <Link
                  style={{ color: 'red' }}
                  onClick={() => {
                    deleteHandler(note._id);
                  }}
                >
                  <i class='fas fa-trash-alt'></i>
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
