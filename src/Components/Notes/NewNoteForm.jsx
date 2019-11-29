import {createField, Input, Textarea} from "../../common/FormControls/FormsControls";
import {requiredField} from "../../utils/validators";
import style from "./Notes.module.css";
import React from "react";
import {reduxForm} from "redux-form";

const NewNoteForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            {createField('title', "title", [requiredField], Input)}
            {createField('body', "body", null, Textarea, {type: "textarea"})}
            {props.error && <div>
                <span className={style.error}>{props.error}</span>
            </div>}
            <div>
                <button>Add Note</button>
            </div>
        </form>
    );
};
export const NewNoteFormReduxForm = reduxForm({form: 'new-note'})(NewNoteForm);