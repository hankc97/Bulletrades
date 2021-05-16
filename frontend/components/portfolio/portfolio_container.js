import {connect} from 'react-redux'
import Portfolio from './portfolio'
import {
    formatToDisplayData, 
    getRecentTotalUserHoldings, 
    getFormattedStartingAmount, 
    getMinAndMaxValueFromFormattedData, 
    setInitialEntityState,
    setInitialEntityCurrentUser,
    setInitialEntityWatchlist
} from '../../reducers/selectors'

import {
    requestAllWatchlist,
    requestAllWatchlistAPI,
    requestCreateWatchlist,
    requestDestroyWatchlist
} from '../../actions/watchlist'

import {fetchAllUserTickerAndQuantity} from '../../actions/user_transaction'
import {requestMultiTickerQuote} from '../../actions/ticker_api'
import {fetchCurrentUserAndFormattedLifetimeTrades} from '../../actions/user_session'
import {openModal} from '../../actions/modal'

const mapStateToProps = (state) => ({
    formattedLifetimeTrades: formatToDisplayData(state.entities.currentUser.formattedLifetimeTrades),
    currentUserOrderHoldingAmount: getRecentTotalUserHoldings(state.entities.currentUser.formattedLifetimeTrades),
    formattedLifetimeTradesStartingAmount: getFormattedStartingAmount(state.entities.currentUser.formattedLifetimeTrades),
    formattedMinAndMaxValueFromDataSet: getMinAndMaxValueFromFormattedData(state.entities.currentUser.formattedLifetimeTrades),
    currentUser: setInitialEntityCurrentUser(state.entities.currentUser[state.session.id]),
    allCurrentUserTickerAndQuantity: setInitialEntityState(state.entities.currentUserOrders),
    quotes: state.entities.currentTickerPageQuote,
    watchlist: setInitialEntityWatchlist(state.entities.watchlist.watchlistsBackend),
    watchlistAPI: state.entities.watchlist.watchlistsAPI
})

const mapDispatchToProps = dispatch => ({
    fetchAllUserTickerAndQuantity: () => dispatch(fetchAllUserTickerAndQuantity()),
    requestMultiTickerQuote: (arrTickers) => dispatch(requestMultiTickerQuote(arrTickers)),
    fetchCurrentUserAndFormattedLifetimeTrades: (format) => dispatch(fetchCurrentUserAndFormattedLifetimeTrades(format)),
    openModal: (modal) => dispatch(openModal(modal)),
    requestAllWatchlist: () => dispatch(requestAllWatchlist()),
    requestAllWatchlistAPI: (tickersArr) => dispatch(requestAllWatchlistAPI(tickersArr)),
    requestCreateWatchlist: (watchlist) => dispatch(requestCreateWatchlist(watchlist)),
    requestDestroyWatchlist: (id) => dispatch(requestDestroyWatchlist(id)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Portfolio)