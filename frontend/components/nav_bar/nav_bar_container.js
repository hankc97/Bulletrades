import {connect} from 'react-redux'
import {NavBar} from './nav_bar'
import {signupUser, loginUser} from '../../actions/user_session'

const mapStateToProps = state => ({
    currentUser: state.session.currentUser
})

const mapDispatchToProps = dispatch => ({
    signupUser: (formUser) => dispatch(signupUser(formUser)),
    loginUser: (formUser) => dispatch(loginUser(formUser))
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)