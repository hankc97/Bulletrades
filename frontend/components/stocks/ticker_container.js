import React from 'react'
import { connect } from 'react-redux'
import Ticker from './ticker'
import {updateUserForm, receiveNewOrderForm, updateUserOrderForm, deleteUserOrderForm} from '../../actions/user_transaction'
import {requestSingleTickerQuote, requestSingleTickerKeyStat, requestSingleTickerCompany} from '../../actions/ticker_api'

const mapStateToProps = (state, ownProps) => {
    return {
        tickerName: ownProps.location.search.slice(1),
        quote: state.entities.tickerQuotes,
        currentUser: state.entities.currentUser[state.session.id]
        // formattedIntradayPrice: formatOneDayTickerData(state.entities.tickerQuotes['intradayPrices'])
    }
}

const mapDispatchToProps = dispatch => ({
    requestSingleTickerQuote: (tickerName) => dispatch(requestSingleTickerQuote(tickerName)),
    requestSingleTickerKeyStat: (tickerName) => dispatch(requestSingleTickerKeyStat(tickerName)),
    requestSingleTickerCompany: (tickerName) => dispatch(requestSingleTickerCompany(tickerName)),
    updateUser: (userForm) => dispatch(updateUserForm(userForm)),
    addOrder: (newUserOrderForm) => dispatch(receiveNewOrderForm(newUserOrderForm)),
    updateOrder: (updatedUserOrderForm, user_buying_power) => dispatch(updateUserOrderForm(updatedUserOrderForm, user_buying_power)),
    deleteOrder: (ticker, tickerId) => dispatch(deleteUserOrderForm(ticker, tickerId))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Ticker)