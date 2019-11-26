import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8000/",
});

export const notesAPI = {
    getNotes() {
        return instance.get(`posts`)
            .then(res => {
                return res.data;
            })
    },
    addNote(note) {
        return instance.post(`posts`, note)
            .then( res => {
                if (res) {
                    return res.data;
                }
            })
    },
    deleteNote(noteId) {
        return instance.delete(`posts/${noteId}`)
            .then(res =>{
                if(res) {
                    return res.data;
                }
            })
    },
    editNote(note) {
        return instance.put(`posts/${note.id}`, note)
            .then( res => {
                if (res.status >= 200 && res.status < 400) {
                    return res.data;
                }
            })
            .catch((err)=>{
                return err;
            })
    },
};