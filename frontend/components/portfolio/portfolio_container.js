import {connect} from 'react-redux'
import Portfolio from './portfolio'
import {updateUserForm} from '../../actions/user_transaction'
import {requestMultiTickerQuote} from '../../actions/ticker_api'
import {fetchCurrentUser} from '../../actions/user_session'

const mapStateToProps = (state) => ({
    currentUser: state.entities.currentUser[state.session.id],
    userOrders: state.entities.userOrders,
    quotes: state.entities.tickerQuotes
})

const mapDispatchToProps = dispatch => ({
    updateUser: (userForm) => dispatch(updateUserForm(userForm)),
    requestMultiQuotes: (arrQuote) => dispatch(requestMultiTickerQuote(arrQuote)),
    fetchCurrentUser: (userId) => dispatch(fetchCurrentUser(userId)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Portfolio)