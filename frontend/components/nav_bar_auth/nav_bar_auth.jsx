import React from 'react'
import {NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons'


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
                <a href = "https://github.com/hankc97/Bulletrades" target = "_blank" className = "nav-bar-left-children">Github<FontAwesomeIcon className = "main-nav-icons" icon={faGithub} /></a>
                <a href = "https://www.linkedin.com/in/hank-chen-software-developer/" target = "_blank" className = "nav-bar-left-children">Linkedin<FontAwesomeIcon className = "main-nav-icons" icon = {faLinkedin} /></a>
                <a href = "https://docs.google.com/gview?url=https://github.com/hankc97/portfolio/raw/main/Hank%20Resume.pdf&embedded=true" target = "_blank" className = "nav-bar-left-children">Resume</a>
                <a href = "https://hankc97.github.io/portfolio/" target = "_blank" className = "nav-bar-left-children">Other Projects</a>
                <a href = "https://stocktwits.com/BulleTrades" target = "_blank" className = "nav-bar-left-children">Follow Us<FontAwesomeIcon icon = {faBell} className = "main-nav-icons"/></a>
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