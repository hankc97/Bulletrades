import {connect} from 'react-redux'
import LoginFormUser from './login_form'
import {loginUser, clearErrors} from '../../actions/user_session'

const mapStateToProps = state => ({
    errors: state.errors.session
})

const mapDispatchToProps = dispatch => ({
    loginUser: (formUser) => dispatch(loginUser(formUser)),
    clearErrors: () => dispatch(clearErrors())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginFormUser)