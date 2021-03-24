import React from 'react'
import { connect } from 'react-redux'
import Ticker from './ticker'
import {updateUserForm} from '../../actions/user_transaction'
import {requestSingleTickerQuote, requestSingleTickerKeyStat, requestSingleTickerCompany} from '../../actions/ticker_api'
// import {formatOneDayTickerData} from '../../reducers/selectors'

const mapStateToProps = (state, ownProps) => {
    return {
        tickerName: ownProps.location.search.slice(1),
        quote: state.entities.tickerQuotes,
        currentUser: state.entities.currentUser,
        // formattedIntradayPrice: formatOneDayTickerData(state.entities.tickerQuotes['intradayPrices'])
    }
}

const mapDispatchToProps = dispatch => ({
    requestSingleTickerQuote: (tickerName) => dispatch(requestSingleTickerQuote(tickerName)),
    requestSingleTickerKeyStat: (tickerName) => dispatch(requestSingleTickerKeyStat(tickerName)),
    requestSingleTickerCompany: (tickerName) => dispatch(requestSingleTickerCompany(tickerName)),
    updateUser: (userForm) => dispatch(updateUserForm(userForm))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Ticker)