import React from 'react';
import './card.css';
import { Link} from 'react-router-dom';
const Card = ({recipe}) => {
    return(
        <div className="card">
            <div className="content">
                <h3>{recipe.label}</h3>
                <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p className="bottom-content">source: {recipe.source}</p>
            </div>
            <div className="img" style={{
                width: '100%',
                backgroundImage: `url(${recipe.image})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                flex: '2',
                marginTop: '0',
                position: "relative"
                
            }}>
                <Link className="preview-btn" to={{pathname: "/info", recipe: recipe}}>preview</Link>
            </div>
        </div>
    );
}

export default Card;