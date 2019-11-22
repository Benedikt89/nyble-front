import React, {useState, useEffect, useRef} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {addNewUser, fetchUsers, deleteUser} from "../Redux/Reducer";

function UsersPage({users, fetchUsers, addNewUser, deleteUser}) {

    const userNameRef = useRef(null);

    const createUser = () => {
        let name = {firstName: userNameRef.current.value};
        addNewUser(name);
        fetchUsers();
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (users === undefined) users = [{id: '123', firstName: 'Bne'}];
    let displayUsers = users.map(u =>
        <div key={u._id}>
            {u.firstName}
            <button onClick={() => {
                deleteUser(u._id)
            }}>X
            </button>
        </div>
    );

    return (
        <div>
            <div>
                <input ref={userNameRef}/>
                <button onClick={createUser}>newUser</button>
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
)(UsersPage);
