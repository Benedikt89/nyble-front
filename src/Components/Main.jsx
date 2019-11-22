import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import Preloader from "../common/Preloader";
import {Redirect, Route} from "react-router-dom";
import UsersPage from "./UsersPage";
import style from './Main.module.css';
import Header from "./Header";
import Notes from "./Notes/Notes";
import Pizzas from "./Pizzas";


function Main(props) {

    return (
        <div>
                <Header/>
                <div className={style.mainWrapper}>
                    <>
                        <Route exact path="/"
                               render={()=> <Redirect to={"/pizzas"}/>}/>
                        <Route path="/users" render={() => <UsersPage/>}/>
                        <Route path="/notes" render={() => <Notes/>}/>
                        <Route path="/pizzas" render={() => <Pizzas/>}/>
                    </>
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
