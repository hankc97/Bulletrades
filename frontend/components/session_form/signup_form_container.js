import {connect} from 'react-redux'
import React from 'react'
import {signup} from '../../actions/user_session'

const mapStateToProps = () => {
    return {
        formType: 'signup',
        
    }
}