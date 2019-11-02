import {applyMiddleware, combineReducers, createStore} from "redux";
import reducer from "./Reducer";
import { reducer as formReducer } from "redux-form";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

const combinedReducers = combineReducers({
    reducer,
    form: formReducer,
});

const store = createStore(combinedReducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default store;