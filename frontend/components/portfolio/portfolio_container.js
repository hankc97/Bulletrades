import {connect} from 'react-redux'
import Portfolio from './portfolio'
import {formatToDisplayData, getRecentTotalUserHoldings, getFormattedStartingAmount, getMinAndMaxValueFromFormattedData, setInitialEntityState} from '../../reducers/selectors'
import {fetchAllUserTickerAndQuantity} from '../../actions/user_transaction'
import {requestMultiTickerQuote} from '../../actions/ticker_api'
import {fetchCurrentUserAndFormattedLifetimeTrades} from '../../actions/user_session'

const mapStateToProps = (state) => ({
    formattedLifetimeTrades: formatToDisplayData(state.entities.currentUser.formattedLifetimeTrades),
    currentUserOrderHoldingAmount: getRecentTotalUserHoldings(state.entities.currentUser.formattedLifetimeTrades),
    formattedLifetimeTradesStartingAmount: getFormattedStartingAmount(state.entities.currentUser.formattedLifetimeTrades),
    formattedMinAndMaxValueFromDataSet: getMinAndMaxValueFromFormattedData(state.entities.currentUser.formattedLifetimeTrades),
    currentUser: state.entities.currentUser[state.session.id],
    allCurrentUserTickerAndQuantity: setInitialEntityState(state.entities.currentUserOrders),
    quotes: state.entities.currentTickerPageQuote
})

const mapDispatchToProps = dispatch => ({
    fetchAllUserTickerAndQuantity: () => dispatch(fetchAllUserTickerAndQuantity()),
    requestMultiTickerQuote: (arrTickers) => dispatch(requestMultiTickerQuote(arrTickers)),
    fetchCurrentUserAndFormattedLifetimeTrades: (format) => dispatch(fetchCurrentUserAndFormattedLifetimeTrades(format)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Portfolio)