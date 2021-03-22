import React from "react";
import {Route, Switch, Redirect} from 'react-router-dom'
import {AuthRoute, ProtectedRoute} from '../utils/route_util'
import NavBarContainer from './nav_bar_auth/nav_bar_auth_container'
import {HomePageComponent} from './home_page/home_page'
import SignupFormContainer from './session_form/signup_form_container'
import LoginFormContainer from './session_form/login_form_container'
import PortfolioContainer from './portfolio/portfolio_container'
import NavBarContainerProtected from './nav_bar_protected/nav_bar_protected_container'
import Ticker from './stocks/ticker'

const Portfolio = () => (
    <>
        <NavBarContainerProtected />
        <PortfolioContainer />
    </>
)

class TickerContainer extends React.Component  {
    render(){
        return <>
        <NavBarContainerProtected />
        <Ticker props = {this.props} />
        </>
    }
}

const App = () => (
    <div>
        <Switch>
            <AuthRoute  path = "/signup" component= {SignupFormContainer}/>
            <AuthRoute  path = "/login" component= {LoginFormContainer}/>
            <Route exact path = "/" render = { () => 
                <>
                    <NavBarContainer/>
                    <HomePageComponent/>
                </>
            }/>
            <ProtectedRoute path = "/portfolio" component = {Portfolio} />
            <ProtectedRoute path = "/stocks" component = {TickerContainer} />
            <Redirect to = "/" />
        </Switch>
    </div>
)

export default App

