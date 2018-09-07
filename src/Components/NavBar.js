import React from 'react';
import {HashRouter, Link} from 'react-router-dom';
import hamburgerImage from '../images/hamburger.png';

export default function NavBar(){
    const home = <HashRouter><Link to='/' >Home</Link></HashRouter>
    const recipe = <HashRouter><Link to='/recipe' >Recipe</Link></HashRouter>
    const profile = <HashRouter><Link to='/profile' >Profile</Link></HashRouter>
    return (
        <div>
            <nav>
                <ul>
                    <li>Search</li>
                    <li>{home}</li>
                    <li>{recipe}</li>
                    <li>{profile}</li>
                    <img className='hamburger' src={hamburgerImage} alt='' />
                </ul>
            </nav>
        </div>
    )
}