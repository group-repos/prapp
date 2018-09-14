import React from 'react';
import './About.css';

import spencer from '../../images/Spencer.jpg';
import dylan from '../../images/Dylan.jpg';
import timboSlice from '../../images/TimboSlice.jpg';


export default function About() {
    return(
        <div>
            <h2>About</h2>
            <p>In our opinion, meal tracking apps in today's market are a super-adequacy. Too many apps allow you to add a recipe, but none of them allow you to plan your week. Here at Prapp, our goal is to empower goal-oriented people to easily plan their food each week by choosing a recipe and having an already populated shopping list when their planning is complete.</p>
            <h3>Meet the developers</h3>
            <div className='photos'>
                <div>
                    <img src={dylan} alt='' />
                </div>
                <div>
                    <img src={spencer} alt='' />
                </div>
                <div>
                    <img src={timboSlice} alt='' />
                </div>
            </div>
        </div>
    )
}