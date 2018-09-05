import React from 'react';
import {HashRouter, Link} from 'react-router-dom';

export default function NavBar(){
    const home = <HashRouter><Link to='/' >Home</Link></HashRouter>
    const recipe = <HashRouter><Link to='/recipe' >Recipe</Link></HashRouter>
    const profile = <HashRouter><Link to='/profile' >Profile</Link></HashRouter>
    return (
        <div>
            <h2>Horizontal NavBar</h2>
            <nav>
                <ul>
                    <li>{home}</li>
                    <li>{recipe}</li>
                    <li>{profile}</li>
                </ul>
            </nav>
        </div>
    )
}