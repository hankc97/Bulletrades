import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {AuthRoute, ProtectedRoute} from '../utils/route_util'
import NavBarContainer from './nav_bar/nav_bar_container'
import {HomePageComponent} from './home_page/home_page'
import SignupFormContainer from './session_form/signup_form_container'

const App = () => (
    <div>
        <Route exact path = "/signup" component= {SignupFormContainer}/>
        <Route exact path = "/" component = {NavBarContainer} />
        <Route exact path = "/" component = {HomePageComponent} />
    </div>
)

export default App