import React from 'react'

class Ticker extends React.Component {
    constructor(props) {
        super(props)
        
    }

    render() {
        return (
            <div className = "main-ticker-page-container">
                <TickerChart requestSingleTickerQuote = {this.props.requestSingleTickerQuote} tickerName = {this.props.tickerName} quote = {this.props.quote}/>
            </div>
        )
    }
}


class TickerChart extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            // tickerName: this.props.tickerName,
            // tickerPrice: this.props.quote[0],
            // tickerMarkPercentChangeToday: 0,
        }
    }

    componentDidMount() {
        this.props.requestSingleTickerQuote(this.props.tickerName)

        this.state.loading = false
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.tickerName !== this.props.tickerName) {
            this.props.requestSingleTickerQuote(this.props.tickerName)
        }
    }

    render() {
        return(
            <div className = "ticker-chart-container">
                <span className = "chart-ticker-name chart-top">{this.props.tickerName}</span>
                <span className = "chart-ticker-mark-price chart-top">${this.props.quote.markPrice}</span>
                <span className = "chart-ticker-change-percentage chart-top">{this.props.quote.changePercentage}% Today</span>

            </div>
        )
    }
}

export default Ticker