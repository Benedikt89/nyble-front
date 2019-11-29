import style from "./Notes.module.css";
import {createField, Input} from "../../common/FormControls/FormsControls";
import React from "react";
import {reduxForm} from "redux-form";

const SearchForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit} className={style.container}>
            {createField('tegSearch', "tegSearch", null, Input)}

            <div>
                <button>Search</button>
            </div>
        </form>
    );
};

export const SearchReduxForm = reduxForm({form: 'tegSearch'})(SearchForm);
