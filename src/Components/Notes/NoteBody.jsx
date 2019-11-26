import React, {useState} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {deleteNote, editNote} from "../../Redux/Reducer";

function NoteBody({note = {id: 1, title: 'no', body: 'no', completed: false}, deleteNote, editNote}) {
    let body = note.body !== undefined ? note.body : 'no-body';
    let [watchMode, setWatchMode] = useState(false);
    let [editMode, setEditMode] = useState(false);
    const [inputBody, setInputBody] = useState(body);
    let [completed, setCompleted] = useState(note.completed);

    let onInputChange = (e) => {
        setInputBody(e.target.value)
    };

    let onCompleteChange = async (e) => {
        await setCompleted(e.target.checked);
        editNote({...note, completed: completed})
    };


    return (
        <div>
            <h4 onClick={()=>{setWatchMode(false)}}
                onDoubleClick={()=>{setWatchMode(true)}}
                onBlur={()=>{setWatchMode(false)}}
            >
                {note.title}
            </h4>
            {watchMode && <div>
                {!editMode ?
                    <article onDoubleClick={() => {
                        setEditMode(true)
                    }}>
                        {body}
                    </article> :
                    <textarea value={inputBody}
                              onChange={onInputChange}
                              onBlur={() => {setEditMode(false); editNote({...note, body: inputBody})}}
                              cols="30" rows="10"
                    />}
                }
                <button onClick={()=>{deleteNote(note.id)}}>x</button>
            </div>}
            <input type="checkbox" value={completed} onChange={onCompleteChange}/>
        </div>
    );
}

export default compose(
    connect(null, {deleteNote, editNote})
)(NoteBody);

