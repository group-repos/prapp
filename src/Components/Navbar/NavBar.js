import React from 'react';
import NavDrawer from '../NavDrawer/NavDrawer';

export default function NavBar(){
    return (
        <div>
            <nav>
                <ul>
                    <li>Search</li>
                    <li><NavDrawer /></li>
                </ul>
            </nav>
        </div>
    )
}