import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {createNewNote, editNote} from "../../Redux/Reducer";

function NoteBody(props) {

    return (
        <div>
           BODY
        </div>
    );
}


const mapStateToProps = (state) => {
    return {
        notes: state.reducer.notes,
        filters: state.reducer.filters
    }
};
export default compose(
    connect(mapStateToProps, {createNewNote, editNote})
)(NoteBody);

