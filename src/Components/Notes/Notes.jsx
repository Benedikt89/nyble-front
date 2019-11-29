import React, {Component} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {createNewNote, editNote, fetchNotes} from "../../Redux/Reducer";
import style from "./Notes.module.css";
import NoteBody from "./NoteBody";
import * as PropTypes from "prop-types";
import {SearchReduxForm} from "./SearchForm";
import {NewNoteFormReduxForm} from "./NewNoteForm";

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


export default compose(
    connect(mapStateToProps, {createNewNote, editNote, fetchNotes})
)(Notes);
