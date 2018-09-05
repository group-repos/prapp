import React from 'react'
import {Switch, Route} from 'react-router-dom';
import Home from './Components/Home';
import SingleRecipePage from './Components/SingleRecipePage';
import UserProfile from './Components/UserProfile';

const routes = (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/recipe' component={SingleRecipePage} />
        <Route path='/profile' component={UserProfile} />
    </Switch>

)

export default routes