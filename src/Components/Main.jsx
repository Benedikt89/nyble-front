import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {Redirect, Route} from "react-router-dom";
import UsersPage from "./UsersPage";
import style from './Main.module.css';
import Header from "./Header";


function Main(props) {

    return (
        <div>
            <div>
                <Header/>
                    <div className={style.mainWrapper}>
                        <Route exact path="/"
                               render={()=> <Redirect to={"/users"}/>}/>
                        <Route path="/users" render={() => <UsersPage/>}/>
                    </div>
            </div>
        </div>
    );
}


const mapStateToProps = (state) => {
    return {
        isFetching: state.reducer.isFetching,
    }
};
export default compose(
    connect(mapStateToProps, {})
)(Main);
