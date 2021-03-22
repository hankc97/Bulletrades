import React from 'react'
import {fetchSingleTickerQuote} from '../../utils/api_util'

class Ticker extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            tickerName: this.props.tickerName,
            tickerPrice: 0,
            tickerMarkPercentChangeToday: 0,
            
        }
        this.data;
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidUpdate() {
        fetchSingleTickerQuote('TSLA').then(responseJSON => this.state.tickerPrice = responseJSON.quote.iexRealtimePrice)

        // debugger
        this.state.loading = false
    }

    handleClick(e) {
        debugger
        console.log(e)
    }

    render() {
        const tickerName = this.props.tickerName
        // debugger
        return (
            <h1 onClick = {this.handleClick} className = "ticker_page">You are on {tickerName} stock page{this.state.tickerPrice}</h1>
        )
    }
}

export default Ticker