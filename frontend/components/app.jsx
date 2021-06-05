import React from "react";
import {Route, Switch, Redirect} from 'react-router-dom'
import {AuthRoute, ProtectedRoute} from '../utils/route_util'
import NavBarContainer from './nav_bar_auth/nav_bar_auth_container'
import HomePageComponent from './home_page/home_page'
import SignupFormContainer from './session_form/signup_form_container'
import LoginFormContainer from './session_form/login_form_container'
import PortfolioContainer from './portfolio/portfolio_container'
import NavBarContainerProtected from './nav_bar_protected/nav_bar_protected_container'
import TickerContainer from './stocks/ticker_container'
import Modal from './modal/modal'

const HomePageContainer = () => (
    <>
        <NavBarContainer/>
        <HomePageComponent/>
    </>
)

const Portfolio = () => (
    <>
        <NavBarContainerProtected />
        <PortfolioContainer />
    </>
)

const TickerPage = ({match}) =>(
    <>
        <NavBarContainerProtected />
        <TickerContainer tickerName = {match.params.tickerName}/>
    </>
)

const App = () => (
    <div>
        <Modal />
        <Switch>
            <AuthRoute  path = "/signup" component= {SignupFormContainer}/>
            <AuthRoute  path = "/login" component= {LoginFormContainer}/>
            <AuthRoute exact path = "/" component = {HomePageContainer} />
            <ProtectedRoute path = "/portfolio" component = {Portfolio} />
            <ProtectedRoute path = "/stocks/:tickerName" component = {TickerPage} />
            <Redirect to = "/" />
        </Switch>
    </div>
)

export default App

