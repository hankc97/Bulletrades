import {connect} from 'react-redux'
import LoginFormUser from './login_form'
import {loginUser} from '../../actions/user_session'

const mapStateToProps = state => ({
    errors: state.errors.session
})

const mapDispatchToProps = dispatch => ({
    loginUser: (formUser) => dispatch(loginUser(formUser))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginFormUser)