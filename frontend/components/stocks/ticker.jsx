import React from 'react'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceArea} from 'recharts';


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

        this.formatOneDayTickerData = this.formatOneDayTickerData.bind(this)
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

    formatOneDayTickerData(intradayPricesArray) {
        if (intradayPricesArray) {
            const formatPriceArray = []; 
            for ( let i = 0; i < intradayPricesArray.length; i += 5) {
                formatPriceArray.push({time: intradayPricesArray[i].minute, price: intradayPricesArray[i].average})
            }
            return formatPriceArray
        }
    }

    render() {
        
        return(
            <div className = "ticker-chart-container">
                <span className = "chart-ticker-name chart-top-about">{this.props.tickerName}</span>
                <span className = "chart-ticker-mark-price chart-top-about">${this.props.quote.markPrice}</span>
                <span className = "chart-ticker-change-percentage chart-top-about">{this.props.quote.changePercentage}% Today</span>
                <LineChart className = "linechart-container" width = {750} height = {300} data = {this.formatOneDayTickerData(this.props.quote['intradayPrices'])} >
                    <XAxis dataKey = "time" hide = {true}/>
                    <YAxis type =  "number" hide = {true} domain={['auto', 'auto']}/>
                    <Line type = "linear"
                            dataKey = "price"
                            stroke = "#32cd32"
                            dot = {false}
                            strokeWidth = {1}
                    />
                    <Tooltip />
                </LineChart>
            </div>
        )
    }
}

export default Ticker