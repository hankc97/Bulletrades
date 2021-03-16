import {connect} from 'react-redux'
import React from 'react'
import {signupUser} from '../../actions/user_session'
import SignupForm from './signup_form'

const mapStateToProps = () => {
    return {
        // errors: errors.session,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signupUser: (formUser) => dispatch(signupUser(formUser)) 
    }
}

export default connect(
    null,
    mapDispatchToProps,
)(SignupForm)
