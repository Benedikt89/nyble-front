import React from 'react';
import style from './Header.module.css';
import {NavLink} from "react-router-dom";

function Header() {

    return (

        <header className={style.headerWrapper}>

            <div className={style.navContainer}>
                <NavLink to="/notes" activeClassName={style.active}>
                    <div className={style.item}>
                        notes
                    </div>
                </NavLink>
                <NavLink to="/users" activeClassName={style.active}>
                    <div className={style.item}>
                        users
                    </div>
                </NavLink>
                <NavLink to="/pizzas" activeClassName={style.active}>
                    <div className={style.item}>
                        pizzas
                    </div>
                </NavLink>
            </div>

        </header>
    );
}

export default Header;
