import {connect} from 'react-redux'
import Portfolio from './portfolio'
import {updateUserForm} from '../../actions/user_transaction'

const mapStateToProps = (state) => ({
    currentUser: state.entities.currentUser[state.session.id]
})

const mapDispatchToProps = dispatch => ({
    updateUser: (userForm) => dispatch(updateUserForm(userForm))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Portfolio)