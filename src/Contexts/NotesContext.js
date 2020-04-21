import React from 'react';
import firebase from '../Config/fbConfig';
import debounce from '../Helpers/debounce';
export const NotesContext = React.createContext({});

const initialState = {
  addingNote: false,
  title: '',
  body: '',
  selectedNote: { title: '', body: '', id: '' },
};

function reducer(state, action) {
  switch (action.type) {
    case 'GET_ALL_NOTES':
      return Object.assign({}, state, { notes: action.notes });

    case 'NEW_NOTE_TOGGLE':
      const currentToggleState = state.addingNote;
      return Object.assign({}, state, { addingNote: !currentToggleState });

    case 'UPDATE_NOTE_TITLE':
      return Object.assign({}, state, { title: action.title });

    case 'UPDATE_NOTE_BODY':
      return Object.assign({}, state, { body: action.body });

    case 'NEW_NOTE':
      const note = { title: action.title, body: action.body };
      const newFromDB = createNewNoteOnDatabase(note);
      const newID = newFromDB.id;
      const newNoteIndex = state.notes.indexOf(
        state.notes.filter(_note => _note.id === newID)[0]
      );
      return Object.assign({}, state, {
        notes: [...state.notes, note],
        selectedNote: state.notes[newNoteIndex],
        selectedNoteIndex: newNoteIndex,
        title: '',
        addingNote: false,
      });

    case 'SET_SELECTED_NOTE':
      return Object.assign({}, state, {
        selectedNoteIndex: action.selectedNoteIndex,
        selectedNote: action.selectedNote,
      });

    case 'DELETE_NOTE':
      deleteNoteFromDataBase(action.note);
      return Object.assign({}, state, {
        notes: state.notes.filter(_note => _note !== action.note),
      });
    default:
      return state;
  }
}

const deleteNoteFromDataBase = async note => {
  await firebase
    .firestore()
    .collection('notes')
    .doc(note.id)
    .delete();
};

const createNewNoteOnDatabase = async ({ title, body }) => {
  await firebase
    .firestore()
    .collection('notes')
    .add({
      title,
      body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
};

export const updateNoteOnDatabase = (id, noteObj) => {
  firebase
    .firestore()
    .collection('notes')
    .doc(id)
    .update({
      title: noteObj.title,
      body: noteObj.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
};

// const update = debounce(() => {
//   updateNoteOnDatabase(state.id, {
//     title: state.title,
//     body: state.text
//   })
// }, 1500)

const Store = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    firebase
      .firestore()
      .collection('notes')
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data['id'] = _doc.id;
          return data;
        });
        dispatch({ type: 'GET_ALL_NOTES', notes });
      });
  }, []);

  return (
    <NotesContext.Provider value={[state, dispatch]}>
      {children}
    </NotesContext.Provider>
  );
};

export default Store;
