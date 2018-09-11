import React from 'react';
import {HashRouter, Link} from 'react-router-dom';
import NavDrawer from '../NavDrawer/NavDrawer';

//MATERIAL UI
import IconButton from '@material-ui/core/IconButton';

import hamburgerImage from '../../images/hamburger.png';

export default function NavBar(){
    const home = <HashRouter><Link to='/' >Home</Link></HashRouter>
    const recipe = <HashRouter><Link to='/recipe' >Recipe</Link></HashRouter>
    const profile = <HashRouter><Link to='/profile' >Profile</Link></HashRouter>
    return (
        <div>
            <nav>
                <ul>
                    <li><NavDrawer /></li>
                    <li>Search</li>
                    <li>{home}</li>
                    <li>{recipe}</li>
                    <li>{profile}</li>
                    <IconButton variant='fab' color='default' aria-label='add' >
                        <img className='hamburger' src={hamburgerImage} alt='' />
                    </IconButton>
                </ul>
            </nav>
        </div>
    )
}