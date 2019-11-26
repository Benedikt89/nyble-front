import React, {Component, useEffect} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {createNewNote, editNote, fetchNotes} from "../../Redux/Reducer";
import {createField, Input, Textarea} from "../../common/FormControls/FormsControls";
import {requiredField} from "../../utils/validators";
import {reduxForm} from "redux-form";
import style from "./Notes.module.css";
import NoteBody from "./NoteBody";
import * as PropTypes from "prop-types";

class Notes extends Component {

    componentDidMount() {
        this.props.fetchNotes();
    }

    render() {
        let {notes, filters, createNewNote} = this.props;

        const onSubmit = (formData) => {
            let newNote = {
                tegs: [],
                id: notes.length +1,
                title: formData.title,
                body: formData.body ? formData.body : 'no Body',
                completed: false,
            };
            createNewNote(newNote);
        };

        if (!notes) notes = [{title: "none", body: "none"}];
        let notesList = notes.map(n => {
            return (<NoteBody note={n}/>)
        });

        return (
            <div className={style.container}>
                <div className={style.searchBar}>
                    <SearchReduxForm/>
                    <div className={style.notesList}>
                        <h4>Notes</h4>
                    </div>
                    {notesList}
                </div>
                <div className={style.noteBody}>
                    <NewNoteFormReduxForm onSubmit={onSubmit}/>
                </div>
            </div>
        );
    }
}

Notes.propTypes = {
    notes: PropTypes.any,
    filters: PropTypes.any,
    createNewNote: PropTypes.any,
    fetchNotes: PropTypes.any
}


const mapStateToProps = (state) => {
    return {
        notes: state.reducer.notes,
        filters: state.reducer.filters
    }
};
const SearchForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit} className={style.container}>
            {createField('tegSearch',"tegSearch", null, Input)}

            <div>
                <button>Search</button>
            </div>
        </form>
    );
};

const SearchReduxForm = reduxForm({form: 'tegSearch'})(SearchForm);


const NewNoteForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            {createField('title',"title", [requiredField], Input)}
            {createField('body',"body", null, Textarea, {type: "textarea"})}
            {props.error && <div>
                <span className={style.error}>{props.error}</span>
            </div>}
            <div>
                <button>Add Note</button>
            </div>
        </form>
    );
};

const NewNoteFormReduxForm = reduxForm({form: 'new-note'})(NewNoteForm);


export default compose(
    connect(mapStateToProps, {createNewNote, editNote, fetchNotes})
)(Notes);
