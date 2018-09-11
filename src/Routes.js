import React from 'react'
import {Switch, Route} from 'react-router-dom';
import Home from './Components/Home/Home';
import SingleRecipePage from './Components/SingleRecipePage/SingleRecipePage';
import UserProfile from './Components/UserProfile/UserProfile';

const routes = (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/recipe' component={SingleRecipePage} />
        <Route path='/profile' component={UserProfile} />
    </Switch>

)

export default routes