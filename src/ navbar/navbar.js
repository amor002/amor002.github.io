import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import './navbar.css';



const NavBar = React.memo((props) => {
    const [toggled, setToggled] = useState(false);
    const inputRef = React.createRef();
    return(
        <nav>
            <h2>Recipe</h2>
            <div className={"toggle-items" + (toggled ? " shown": "")}>
                <div className="form">
                    <input placeholder="search recipe..." ref={inputRef} onKeyUp={(e) => {
                        if(e.keyCode === 13) {
                            props.search(e.currentTarget.value);
                        }
                    }}/>
                    <button onClick={() => {props.search(inputRef.current.value)}}>
                        <i className="material-icons">search</i>
                    </button>
                </div>
                <ul>
                    <li><NavLink to="/" exact>Home</NavLink></li>
                    <li><NavLink to="/examples" exact>Popular</NavLink></li>
                    <li><NavLink to="/about" exact>About</NavLink></li>
                </ul>
            </div>
            <a href={"#"} onClick={() => setToggled(!toggled)} id="drawer"><i className="material-icons menu-icon">menu</i></a>
        </nav>
    );
});

export default NavBar;