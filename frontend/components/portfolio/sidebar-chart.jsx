import React from 'react'
import {LineChart, Line, XAxis, YAxis} from 'recharts';
import {Link} from 'react-router-dom'

class Chart extends React.Component {
    constructor(props) {
        super(props)
    }

    formatQuote(pricesArray) {
        const formattedQuote = []
        const intradayPrices = pricesArray['intraday-prices']

        for (let i = 0; i < intradayPrices.length; i+=5) {
            formattedQuote.push({time: intradayPrices[i].date, price: intradayPrices[i].average})
        }

        return formattedQuote
    }

    formatPercentChangeToday(pricesArray) {
        if (pricesArray['intraday-prices'].length < 2) return
        let endPrice = pricesArray['intraday-prices'][pricesArray['intraday-prices'].length - 1].average
        let startPrice = pricesArray['intraday-prices'][0].average

        let percentageChangeToday = ( ( endPrice / startPrice ) - 1 ) * 100
        let sign = (endPrice > startPrice) ? "+" : ""
        return [sign, `${sign}${parseFloat(percentageChangeToday).toFixed(2)}`]
    }

    render() {
        let tickerName, quantity, sharesDiv

        if (this.props.chartType === "ownedTickers") {
            [tickerName, quantity] = this.props.singleOrder
            sharesDiv = <p>{quantity} Shares</p>
        } 
        if (this.props.chartType === "watchlist") {
            tickerName = this.props.tickerName
        }

        let chartData, price, percentageChangeToday, color, sign
        if (this.props.singleQuote) {
            chartData = this.formatQuote(this.props.singleQuote)
            price = this.props.singleQuote['price']
            const formatReturn = this.formatPercentChangeToday(this.props.singleQuote)
            sign = formatReturn[0]
            percentageChangeToday = formatReturn[1]
            color = (sign === '+') ? 'rgb(0, 200, 5)' : 'rgb(255,80,0)'
        }

        return(
            <Link className = 'single-ticker-user-order' to = {`/stocks/${tickerName}`}>
                <div className = "single-ticker-quantity-and-name">
                    <span>{tickerName}</span>
                    {sharesDiv}
                </div>
                <LineChart className = "linechart-container" width = {50} height = {25} data = {chartData} cursor="pointer">
                    <XAxis  
                        dataKey = "time"
                        hide = {true}
                        domain={['auto', 'auto']}
                    />
                    <YAxis  
                        type =  "number" 
                        hide = {true} 
                        domain={['auto', 'auto']}
                    />
                    <Line
                        className = "recharts-line"
                        type = "monotone"
                        dataKey = "price"
                        stroke = {color}
                        dot = {false}
                        strokeWidth = {1}
                        type = "linear"/>
                </LineChart>
                <div className = 'price-single-order'>
                    <span className = "">${price}</span>
                    <span className = "percentage-change-today-order">{percentageChangeToday}%</span>
                </div>
            </Link>
        )
    }
}

export default Chart