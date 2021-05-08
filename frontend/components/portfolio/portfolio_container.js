import {connect} from 'react-redux'
import Portfolio from './portfolio'
import {formatToDisplayData, getRecentTotalUserHoldings, getFormattedStartingAmount, getMaxValueFromFormattedData} from '../../reducers/selectors'
import {updateUserForm} from '../../actions/user_transaction'
import {requestMultiTickerQuote} from '../../actions/ticker_api'
import {fetchCurrentUserAndFormattedLifetimeTrades} from '../../actions/user_session'

const mapStateToProps = (state) => ({
    formattedLifetimeTrades: formatToDisplayData(state.entities.currentUser.formattedLifetimeTrades),
    currentUserOrderHoldingAmount: getRecentTotalUserHoldings(state.entities.currentUser.formattedLifetimeTrades),
    formattedLifetimeTradesStartingAmount: getFormattedStartingAmount(state.entities.currentUser.formattedLifetimeTrades),
    formattedMaxValueFromDataSet: getMaxValueFromFormattedData(state.entities.currentUser.formattedLifetimeTrades),
    currentUser: state.entities.currentUser[state.session.id],
    // userOrders: state.entities.userOrders,
    quotes: state.entities.tickerQuotes
})

const mapDispatchToProps = dispatch => ({
    // updateUser: (userForm) => dispatch(updateUserForm(userForm)),
    requestMultiQuotes: (arrQuote) => dispatch(requestMultiTickerQuote(arrQuote)),
    fetchCurrentUserAndFormattedLifetimeTrades: (format) => dispatch(fetchCurrentUserAndFormattedLifetimeTrades(format)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Portfolio)