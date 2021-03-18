import React from 'react'
import {connect} from 'react-redux'
import NavBarAuth from './nav_bar_auth'
import {signupUser, loginUser} from '../../actions/user_session'

const mapStateToProps = state => ({
    currentUser: state.entities.currentUser
})

const mapDispatchToProps = dispatch => ({
    signupUser: (formUser) => dispatch(signupUser(formUser)),
    loginUser: (formUser) => dispatch(loginUser(formUser))
})

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(NavBarAuth)