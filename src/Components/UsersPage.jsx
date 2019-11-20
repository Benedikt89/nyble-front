import React, {useState, useEffect, useRef} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {addNewUser, fetchUsers} from "../Redux/Reducer";

function UsersPage({users, fetchUsers, addNewUser}) {



    const userNameRef = useRef(null);

    const createUser = () => {
        let name = {firstName: userNameRef.current.value};
        addNewUser(name);
        fetchUsers();
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    let displayUsers = users.map(u => <div key={u.id}>{u.firstName}</div>);

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
    connect(mapStateToProps, {fetchUsers, addNewUser})
)(UsersPage);
