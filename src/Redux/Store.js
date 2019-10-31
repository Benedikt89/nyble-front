import {applyMiddleware, combineReducers, createStore} from "redux";
import reducer from "./Reducer";
import { reducer as formReducer } from "redux-form";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

const persistedState = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : {};

const combinedReducers = combineReducers({
    reducer,
    form: formReducer,
});

const store = createStore(combinedReducers, persistedState, composeWithDevTools(applyMiddleware(thunkMiddleware)));

store.subscribe(()=>{
    let orderStorage = {
        state: store.getState().reducer
    };
    localStorage.setItem('notes', JSON.stringify(orderStorage))
});

export default store;