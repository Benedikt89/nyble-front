import React, {useState, useEffect, useRef} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {addNewUser, fetchUsers, deleteUser} from "../Redux/Reducer";
import axios from "axios";

const PizzaForm = ({onSubmit}) => {
    const userNameRef = useRef(null);
    // @ts-ignore
    let mainPhotoSelected = (e) => {
        if (e.target.files.length) {
            let formData = new FormData();
            formData.append('image', e.target.files[0]);
            axios.put(`profile/photo`, formData, {
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            })
        }
    };
    const createPizza = () => {
        // @ts-ignore
        let name = userNameRef.current.value !== null ? userNameRef.current.value : 'asd';
        onSubmit(name)
    };

    return (
        <div>
            <div>
                <input onChange={mainPhotoSelected} type={"file"}/>
                <input ref={userNameRef}/>
                <button onClick={createPizza}>newUser</button>
            </div>
        </div>
    )
}

function Pizzas(props) {

    const userNameRef = useRef(null);
    let [pizzas, setPizzas] = useState([]);

    const fetchPizzas = async () => {
        const upPizzas = await axios.get("http://127.0.0.1:8000/pizzas");
        setPizzas(upPizzas.data);
    };
    const addNewPizza = async (formData) => {
        await axios.post("http://127.0.0.1:8000/pizzas", formData);
        fetchPizzas();
    };
    const deletePizza = async (id) => {
        await axios.delete(`http://127.0.0.1:8000/pizzas/${id}`);
        fetchPizzas();
    };
    const createPizza = () => {
        let obj = {name: userNameRef.current.value};
        addNewPizza(obj);
        fetchPizzas();
    };

    useEffect(() => {
        fetchPizzas();
    }, []);

    if (pizzas === undefined) pizzas = [{id: '123', name: 'Bne'}];
    let displayUsers = pizzas.map(p =>
        <div key={p._id}>
            {p.name}
            <button onClick={() => {
                deletePizza(p._id)
            }}>X
            </button>
        </div>
    );

    return (
        <div>
            <div>
                <input ref={userNameRef}/>
                <button onClick={createPizza}>newUser</button>
            </div>
            {displayUsers}
        </div>
    );
}


const mapStateToProps = (state) => {
    return {
        isFetching: state.reducer.isFetching,
        users: state.reducer.users
    }
};
export default compose(
    connect(mapStateToProps, {fetchUsers, addNewUser, deleteUser})
)(Pizzas);
