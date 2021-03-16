import React from 'react'
import {Route} from 'react-router-dom'
import {AuthRoute, ProtectedRoute} from '../utils/route_util'
import NavBarContainer from './nav_bar/nav_bar_container'
import {HomePageComponent} from './home_page/home_page'


const App = () => (
    <div>
        {/* <AuthRoute path = "/login" component= {}/> */}
        <Route path = "/" component = {NavBarContainer} />
        <Route exact path = "/" component = {HomePageComponent} />
    </div>
)

export default App