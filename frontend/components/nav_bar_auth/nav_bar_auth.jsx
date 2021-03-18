import React from 'react'
import {Link, NavLink} from 'react-router-dom'

const NavBarAuth = ({currentUser, signupUser, loginUser}) => (
    <div className = "nav-bar-main">
        <NavBarLeft />
        <NavBarRight login = {loginUser} signup = {signupUser}/>
    </div>
)
class NavBarLeft extends React.Component {
    render() {
        return(
            <div className = "nav-bar-left">
                <div className = "Logo"><img src = {window.btLogo}/></div>
                <div className = "nav-bar-left-children">Product</div>
                <div className = "nav-bar-left-children">Learn</div>
                <div className = "nav-bar-left-children">Support</div>
                <div className = "nav-bar-left-children">Who We Are</div>
            </div>
        )
    }
}

class NavBarRight extends React.Component {
    render() {
        return(
            <div className = "nav-bar-right">
                <NavLink className = "nav-bar-right-children Login" to = '/login'>Log In</NavLink>
                <NavLink className = "nav-bar-right-children Signup" to = '/signup' >Sign Up</NavLink>
            </div>
        )
    }
}


export default NavBarAuth