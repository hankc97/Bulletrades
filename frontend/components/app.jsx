import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {AuthRoute, ProtectedRoute} from '../utils/route_util'
import NavBarContainer from './nav_bar/nav_bar_container'
import {HomePageComponent} from './home_page/home_page'
import SignupFormContainer from './session_form/signup_form_container'
import LoginFormContainer from './session_form/login_form_container'
import PortfolioContainer from './portfolio/portfolio_container'

const App = () => (
    <div>
        <AuthRoute exact path = "/signup" component= {SignupFormContainer}/>
        <AuthRoute exact path = "/login" component= {LoginFormContainer}/>
        <ProtectedRoute exact path = "/portfolio" component = {PortfolioContainer} />
        <Route exact path = "/" component = {NavBarContainer} />
        <Route exact path = "/" component = {HomePageComponent} />
        {/* <Route path = "*" component = {HomePageComponent} /> */}
    </div>
)

export default App

