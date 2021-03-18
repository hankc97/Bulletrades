import React from 'react'
import {NavLink} from 'react-router-dom'

const NavBarProtected = ({logoutUser}) => (
    <div className = "nav-bar-protected-main">
        <div className = "nav-bar-protected-logo"><img src = {window.btLogo}/></div>
        <NavBarSearch />
        <NavBarRight />
    </div>
)

class NavBarSearch extends React.Component {
    render() {
        return (
            <div>


            </div>
        )
    }
}

class NavBarRight extends React.Component {
    render() {
        return (
            <div>
                <span>Free Stocks</span>
                <span>Portfolio</span>
                <span>Cash</span>
                <span>Messages</span>
                <span>Account</span>
            </div>
        )
    }
}











export default NavBarProtected