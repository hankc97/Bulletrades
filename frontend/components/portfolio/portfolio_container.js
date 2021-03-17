import {connect} from 'react-redux'
import {logoutUser} from '../../actions/user_session'
import Portfolio from './portfolio'

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser())
})

export default connect(
    null,
    mapDispatchToProps
)(Portfolio)