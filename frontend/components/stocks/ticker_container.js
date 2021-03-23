import React from 'react'
import { connect } from 'react-redux'
import Ticker from './ticker'
import {requestSingleTickerQuote} from '../../actions/ticker_api'
import {formatOneDayTickerData} from '../../reducers/selectors'

const mapStateToProps = (state, ownProps) => {
    return {
        tickerName: ownProps.location.search.slice(1),
        quote: state.entities.tickerQuotes,
        // formattedIntradayPrice: formatOneDayTickerData(state.entities.tickerQuotes['intradayPrices'])
    }
}

const mapDispatchToProps = dispatch => ({
    requestSingleTickerQuote: (tickerName) => dispatch(requestSingleTickerQuote(tickerName))
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Ticker)