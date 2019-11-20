import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:7575",
});

export const usersAPI = {
    getUsers () {
        return instance.get('/users')
            .then(res => res.data)
    },
    postUser (name) {
        return instance.post("/users", name)
            .then( res => res.data )
    }
};