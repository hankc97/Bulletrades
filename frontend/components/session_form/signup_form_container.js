import {connect} from 'react-redux'
import {signupUser, clearErrors} from '../../actions/user_session'
import SignupForm from './signup_form'

const mapStateToProps = (state) => {
    return {
        errors: state.errors.session,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signupUser: (formUser) => dispatch(signupUser(formUser)),
        clearErrors: () => dispatch(clearErrors())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SignupForm)
