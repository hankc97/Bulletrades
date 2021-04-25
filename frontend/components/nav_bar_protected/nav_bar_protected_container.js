import {connect} from 'react-redux'
import NavBarProtected from './nav_bar_protected'
import {logoutUser} from '../../actions/user_session'

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser()),
})

export default connect(
    null,
    mapDispatchToProps
)(NavBarProtected)