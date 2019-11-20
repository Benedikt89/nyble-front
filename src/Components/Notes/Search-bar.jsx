import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {createNewNote, editNote} from "../../Redux/Reducer";
import {createField, Input, Textarea} from "../../common/FormControls/FormsControls";
import {requiredField} from "../../utils/validators";
import {reduxForm} from "redux-form";
import style from "../Order/Order.module.css";

function Notes({notes, filters, createNewNote}) {

    const onSubmit = (formData) => {
        let newNote = {
            tegs: [],
                id: 123,
            title: formData.title,
            body: formData.body? formData.body : 'no Body',
            completed: false,
        };
        createNewNote(newNote);
    };

    let notesList = notes.map(n=> {
        return (<div>
            <div>{n.title}</div>
            <div>{n.body}</div>
        </div>)});

    return (
        <div>
            <OrderReduxForm onSubmit={onSubmit}/>
            <div>
                {notesList}
            </div>
        </div>
    );
}


const mapStateToProps = (state) => {
    return {
        notes: state.reducer.notes,
        filters: state.reducer.filters
    }
};


const OrderForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            {createField('title',"title", [requiredField], Input)}
            {createField('body',"body", null, Textarea, {type: "textarea"})}
            {props.error && <div>
                <span className={style.error}>{props.error}</span>
            </div>}
            <div>
                <button>ORDER</button>
            </div>
        </form>
    );
};

const OrderReduxForm = reduxForm({form: 'new-note'})(OrderForm);


export default compose(
    connect(mapStateToProps, {createNewNote, editNote})
)(Notes);
