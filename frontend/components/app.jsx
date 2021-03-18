import React from "react";
import {Route, Switch, Redirect} from 'react-router-dom'
import {AuthRoute, ProtectedRoute} from '../utils/route_util'
import NavBarContainer from './nav_bar/nav_bar_container'
import {HomePageComponent} from './home_page/home_page'
import SignupFormContainer from './session_form/signup_form_container'
import LoginFormContainer from './session_form/login_form_container'
import PortfolioContainer from './portfolio/portfolio_container'
import { BrowserRouter as Router} from "react-router-dom";

const App = () => (
    <div>
        <ProtectedRoute exact path = "/portfolio" component = {PortfolioContainer} />
        
        <AuthRoute exact path = "/signup" component= {SignupFormContainer}/>
        <AuthRoute exact path = "/login" component= {LoginFormContainer}/>
        <Route exact path = "/" render = { () => 
            <>
                <NavBarContainer/>
                <HomePageComponent/>
            </>
        } />
       
        <Route exact  path = "*" render = { () => (
            <Redirect to = "/" />
        )} />
            
    </div>
)

export default App

