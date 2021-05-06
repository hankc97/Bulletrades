import { connect } from 'react-redux'
import Ticker from './ticker'
import {updateUserForm, createNewOrderForm, updateUserOrderForm, deleteUserOrderForm, receiveAllCurrentUserOrders, receiveSingleCurrentUserOrders} from '../../actions/user_transaction'
import {requestSingleTickerQuote, requestSingleTickerKeyStat, requestSingleTickerCompany, requestSingleTickerHistoricalQuote} from '../../actions/ticker_api'
import {requestSingleTickerNews} from '../../actions/news_api'
import { getTotalQuantityWithTotalAvgPrice } from '../../reducers/selectors'

const mapStateToProps = (state, ownProps) => {
    return {
        tickerName: ownProps.tickerName,
        quote: state.entities.currentTickerPageQuote,
        historicalQuote: state.entities.currentTickerPageQuote.singleHistoricalQuote,
        news: state.entities.currentTickerPageQuote.news,
        currentUser: state.entities.currentUser[state.session.id],
        currentUserOrder: getTotalQuantityWithTotalAvgPrice(state.entities.currentUserOrders),
        portfolioPercentageValue: state.entities.currentTickerPageQuote.portfolioPercentage * 100
    }
}

const mapDispatchToProps = dispatch => ({
    requestSingleTickerQuote: (tickerName) => dispatch(requestSingleTickerQuote(tickerName)),
    requestSingleTickerKeyStat: (tickerName) => dispatch(requestSingleTickerKeyStat(tickerName)),
    requestSingleTickerCompany: (tickerName) => dispatch(requestSingleTickerCompany(tickerName)),
    requestSingleTickerHistoricalQuote: (ticker, date) => dispatch(requestSingleTickerHistoricalQuote(ticker, date)),
    requestSingleTickerNews: (tickerName) => dispatch(requestSingleTickerNews(tickerName)),
    updateUser: (userForm) => dispatch(updateUserForm(userForm)),
    createOrder: (newUserOrderForm, user_buying_power) => dispatch(createNewOrderForm(newUserOrderForm, user_buying_power)),
    updateOrder: (updatedUserOrderForm, user_buying_power) => dispatch(updateUserOrderForm(updatedUserOrderForm, user_buying_power)),
    deleteOrder: (ticker, markPrice) => dispatch(deleteUserOrderForm(ticker, markPrice)),
    receiveSingleCurrentUserOrders: (ticker) => dispatch(receiveSingleCurrentUserOrders(ticker)),
    fetchAllOrders: () => dispatch(receiveAllCurrentUserOrders())
}) 

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Ticker)