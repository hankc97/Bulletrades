import React from 'react'
import {NavLink} from 'react-router-dom'

const NavBarAuth = ({signupUser, loginUser}) => (
    <div className = "nav-bar-main">
        <NavBarLeft />
        <NavBarRight login = {loginUser} signup = {signupUser}/>
    </div>
)
class NavBarLeft extends React.Component {
    render() {
        return(
            <div className = "nav-bar-left">
                <div className = "Logo"><h2 class = "bulletrades">BulleTrades</h2><img src = {window.btLogo}/></div>
                <div className = "nav-bar-left-children">Products<i class="fa fa-angle-down"></i></div>
                <div className = "nav-bar-left-children">Learn<i class="fa fa-angle-down"></i></div>
                <div className = "nav-bar-left-children">Support</div>
                <div className = "nav-bar-left-children">Who We Are<i class="fa fa-angle-down"></i></div>
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