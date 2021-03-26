import React from 'react'
import { connect } from 'react-redux'
import Ticker from './ticker'
import {updateUserForm, receiveNewOrderForm, updateUserOrderForm, deleteUserOrderForm, receiveAllCurrentUserOrders} from '../../actions/user_transaction'
import {requestSingleTickerQuote, requestSingleTickerKeyStat, requestSingleTickerCompany, } from '../../actions/ticker_api'

const mapStateToProps = (state, ownProps) => {
    return {
        tickerName: ownProps.location.search.slice(1),
        quote: state.entities.tickerQuotes,
        currentUser: state.entities.currentUser[state.session.id],
        userOrders: state.entities.userOrders
    }
}

const mapDispatchToProps = dispatch => ({
    requestSingleTickerQuote: (tickerName) => dispatch(requestSingleTickerQuote(tickerName)),
    requestSingleTickerKeyStat: (tickerName) => dispatch(requestSingleTickerKeyStat(tickerName)),
    requestSingleTickerCompany: (tickerName) => dispatch(requestSingleTickerCompany(tickerName)),
    updateUser: (userForm) => dispatch(updateUserForm(userForm)),
    addOrder: (newUserOrderForm, user_buying_power) => dispatch(receiveNewOrderForm(newUserOrderForm, user_buying_power)),
    updateOrder: (updatedUserOrderForm, user_buying_power) => dispatch(updateUserOrderForm(updatedUserOrderForm, user_buying_power)),
    deleteOrder: (ticker, tickerId) => dispatch(deleteUserOrderForm(ticker, tickerId)),
    fetchAllOrders: () => dispatch(receiveAllCurrentUserOrders())
}) 

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Ticker)