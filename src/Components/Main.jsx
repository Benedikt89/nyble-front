import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {Redirect, Route} from "react-router-dom";
import style from './Main.module.css';
import Header from "./Header";
import Notes from "./Notes/Notes";
import { Button } from 'antd';

function Main(props) {

    return (
        <div>
            <Button type="primary">Button</Button>
            <Header/>
            <div className={style.mainWrapper}>
                <Route exact path="/"
                       render={() => <Redirect to={"/notes"}/>}/>
                <Route path="/notes" render={() => <Notes/>}/>
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
