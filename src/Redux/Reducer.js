import {notesAPI} from "./API/api";

//actions types decloration
const CREATE_NOTE = 'MAIN_PAGE/CREATE_NOTE';
const CREATE_TEG = 'MAIN_PAGE/CREATE_TEG';
const EDIT_NOTE = 'MAIN_PAGE/EDIT_NOTE';
const DELETE_NOTE = 'MAIN_PAGE/DELETE_NOTE';
const SET_IS_FETCHING = 'COMMON/SET_IS_FETCHING';
const SET_NOTES = 'MAIN_PAGE/SET_NOTES';

const initialState = {
    notes: [],
    filters: [{title: 'big'}],
    isFetching: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        //setting fetching status
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.status,
            };
        //adding notes to state
        case SET_NOTES:
            return {
                ...state,
                notes: action.notes
            };
        //edit single note in state
        case EDIT_NOTE:
            return {
                ...state,
                notes: state.notes.map(nt => {
                    if (nt.id !== action.note.id) {
                        return nt;
                    } else {
                        return action.note
                    }
                }),
            };
        //adding note item to state
        case CREATE_NOTE:
                return {
                    ...state,
                    notes: [
                        ...state.notes,
                        action.newNote
                    ]
                };
                //adding teg to state
        case CREATE_TEG:
            return {
                ...state,
                filters: [state.filters, action.newFilter]
            };
        case DELETE_NOTE:
            return {
                ...state,
                notes: state.notes.filter(n => n.id !== action.id)
            };
        default:
            return state;
    }
};

//LOCAL ACTIONS
export const createNewNoteSuccess = (newNote) => {
    return {
        type: CREATE_NOTE, newNote
    }
};
export const createTeg = (newFilter) => {
    return {
        type: CREATE_TEG, newFilter
    }
};
export const setNotesSuccess = (notes) => {
    return {
        type: SET_NOTES, notes
    }
};
export const editNoteSuccess = (note) => {
    return {
        type: EDIT_NOTE, note
    }
};
export const deleteNoteSuccess = (id, newTask) => {
    return {
        type: DELETE_NOTE, id, newTask
    }
};

const toggleIsFetching = (status) => {
    return {
        type: SET_IS_FETCHING, status
    }
};

//FETCH ACTIONS
export const createNewNote = (note) => async (dispatch) => {
    let newNote = await notesAPI.addNote(note);
            dispatch(createNewNoteSuccess(newNote))
};
export const fetchNotes = () => async (dispatch) => {
    let data = await notesAPI.getNotes();
            dispatch(setNotesSuccess(data))
};
export const deleteNote = (noteId) => (dispatch) => {
    notesAPI.deleteNote(noteId)
        .then( () => {
            dispatch(deleteNoteSuccess(noteId))
        })
};
export const editNote = (newNote) => (dispatch) => {
    notesAPI.editNote(newNote)
        .then(note => {
            dispatch(editNoteSuccess(note))
        })
};
export default reducer;