import React from 'react'
import {Route} from 'react-router-dom'
import {AuthRoute, ProtectedRoute} from '../utils/route_util'
import NavBarComponent from './components/nav_bar/nav_bar_container'

const App = () => (
    <div>
        <Route exact path = "/" component = {HomePageComponent} />
        <Route path = "/" component = {NavBarComponent} />
    </div>
)

export default App