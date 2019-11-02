import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3000/",
});

export const usersAPI = {
    getUsers () {
        return axios.get('users')
            .then(res => res.data)
    },
    postUser (name) {
        return axios.post("users", name)
            .then( res => res.data )
    }
};

export const notesAPI = {
    getNotes() {
        return instance.get(`users`)
            .then(res => {
                return res.data;
            })
    },
    addNote(note) {
        return instance.post(`users`, note)
            .then( res => {
                if (res.data.resultCode === 0) {
                    return res.data.data;
                }
            })
    },
    deleteNote(noteId) {
        return instance.delete(`users/${noteId}`)
            .then(res =>{
                if(res.data.resultCode === 0) {
                    return res.data;
                }
            })
    },
    editNote(note) {
        return instance.put('users', note)
            .then( res => {
                if (res.data.resultCode === 0) {
                    return res.data.data;
                }
            })
    },
};