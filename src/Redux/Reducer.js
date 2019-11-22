import {notesAPI, usersAPI} from "./API/api";

//actions types decloration
const CREATE_NOTE = 'MAIN_PAGE/CREATE_NOTE';
const CREATE_TEG = 'MAIN_PAGE/CREATE_TEG';
const SET_USERS = 'USERS_PAGE/SET_USERS';
const ADD_USER = 'USERS_PAGE/ADD_USER';
const DELETE_USER = 'USERS_PAGE/DELETE_USER';
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
        //adding users to state
        case SET_USERS:
            return {
                ...state,
                users: action.users
            };
        case ADD_USER:
            return {
                ...state,
                users: [...state.users, action.newUser]
            };
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(u => u._id !== action.id)
            };
        //edit single note in state
        case EDIT_NOTE:
            return {
                ...state,
                notes: state.notes.map(nt => {
                    if (nt.id !== action.id) {
                        return nt;
                    } else {
                        return action.newTask
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
export const setUsersSuccess = (users) => {
    return {
        type: SET_USERS, users
    }
};
export const addUserSuccess = (newUser) => {
    return {
        type: ADD_USER, newUser
    }
};
export const deleteUserSuccess = (id) => {
    return {
        type: DELETE_USER, id
    }
};


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
export const editNoteSuccess = (obj) => {
    return {
        type: EDIT_NOTE, obj
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
export const fetchUsers = () => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    const users = await usersAPI.getUsers();
    dispatch(setUsersSuccess(users));
    dispatch(toggleIsFetching(false));
};

export const addNewUser = (userName) => async (dispatch) => {
    const res = await usersAPI.postUser(userName);
    dispatch(addUserSuccess(res));
};
export const deleteUser = (id) => (dispatch) => {
    usersAPI.deleteUser(id)
        .then( () => {
            dispatch(deleteUserSuccess(id))
        })
};
export const createNewNote = (note) => async (dispatch) => {
    let newNote = await notesAPI.addNote(note)
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
        .then(newNote => {
            dispatch(editNoteSuccess(newNote))
        })
};
export default reducer;