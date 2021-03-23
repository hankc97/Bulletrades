import React from 'react'
import { connect } from 'react-redux'
import Ticker from './ticker'
import {requestSingleTickerQuote} from '../../actions/ticker_api'


const mapStateToProps = (state, ownProps) => {
    return {
        tickerName: ownProps.location.search.slice(1),
        quote: state.entities.tickerQuotes
    }
}

const mapDispatchToProps = dispatch => ({
    requestSingleTickerQuote: (tickerName) => dispatch(requestSingleTickerQuote(tickerName))
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Ticker)