import React, {useState, useEffect, useRef} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import Preloader from "../common/Preloader";
import {Redirect, Route} from "react-router-dom";
import UsersPage from "./UsersPage";
import style from './Main.module.css';
import Header from "./Header";


function Main(props) {

    const [users, setUsers] = useState([]);

    useEffect(()=>{
    },[]);

    return (
        <div>
            <div>
                <Header totalQuantity={this.props.totalQuantity} totalPrice={this.props.totalPrice}/>

                {props.isFetching ?
                    <Preloader/> :
                    <div className={style.mainWrapper}>
                        <Route exact path="/"
                               render={()=> <Redirect to={"/users"}/>}/>
                        <Route path="/users" render={() => <UsersPage/>}/>
                    </div>
                }

            </div>
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
    connect(mapStateToProps, {})
)(Main);
