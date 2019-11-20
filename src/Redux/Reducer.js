import {usersAPI} from "./API/api";

//actions types decloration
const CREATE_NOTE = 'MAIN_PAGE/CREATE_NOTE';
const CREATE_TEG = 'MAIN_PAGE/CREATE_TEG';
const SET_USERS = 'USERS_PAGE/SET_USERS';
const ADD_USER = 'USERS_PAGE/ADD_USER';
const EDIT_NOTE = 'MAIN_PAGE/EDIT_NOTE';
const DELETE_NOTE = 'MAIN_PAGE/DELETE_NOTE';
const SET_IS_FETCHING = 'COMMON/SET_IS_FETCHING';


const initialState = {
    users: [
        {
            id: 12,
            firstName: "123",
            completed: false,
        },
        {
            id: 13,
            firstName: "ngiuyg yug #gubv",
        },
    ],
    notes: [
        {
            tegs: [{name: 'big'}],
            id: 123,
            title: "123",
            body: "ngiuyg yug #gubv",
            completed: false,
        },
    ],
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
        case SET_USERS:
            return {
                ...state,
                users: action.users
            };
        //adding filters to state
        case ADD_USER:
            return {
                ...state,
                users: [...state.users, action.newUser]
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
export const createNewNote = (newNote) => {
    return {
        type: CREATE_NOTE, newNote
    }
};
export const createTeg = (newFilter) => {
    return {
        type: CREATE_TEG, newFilter
    }
};
export const editNote = (obj) => {
    return {
        type: EDIT_NOTE, obj
    }
};
export const deleteNote = (id, newTask) => {
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
    dispatch(fetchUsers())
};

export default reducer;