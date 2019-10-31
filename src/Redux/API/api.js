import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:7575/",
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