import React from 'react'
import SideBarTicker from './sidebar/sidebar_ticker'
import StockList from '../stock_lists/stockLists'
import {LineChart, Line, XAxis, YAxis, Tooltip} from 'recharts';

class Ticker extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className = "ticker-page">
                <div className = "main-ticker-page-container">
                    {/* <StockList /> Add at the end */}
                    <TickerChartAbout 
                        requestSingleTickerQuote = {this.props.requestSingleTickerQuote} 
                        requestSingleTickerKeyStat = {this.props.requestSingleTickerKeyStat}
                        requestSingleTickerCompany = {this.props.requestSingleTickerCompany}
                        requestSingleTickerHistoricalQuote = {this.props.requestSingleTickerHistoricalQuote}
                        tickerName = {this.props.tickerName} 
                        quote = {this.props.quote}
                        historicalQuote = {this.props.historicalQuote}
                    />
                    <SideBarTicker 
                        currentUser = {this.props.currentUser}
                        markPrice = {this.props.quote.markPrice}
                        tickerName = {this.props.tickerName}
                        addOrder = {this.props.addOrder}
                        updateOrder = {this.props.updateOrder}
                        deleteOrder = {this.props.deleteOrder}
                        userOrders = {this.props.userOrders}
                        fetchAllOrders = {this.props.fetchAllOrders}
                    />
                </div>
            </div>
        )
    }
}

class TickerChartAbout extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            chartDate: "1D",
        }

        this.currentMarkPriceDOMRef = React.createRef()
        this.hoverChartPriceDOMRef = React.createRef()
        this.currentTodayChangePriceDOMRef = React.createRef()
        this.hoverChartChangePriceDOMRef = React.createRef()
        this.formatOneDayTickerData = this.formatOneDayTickerData.bind(this)
        this.formatSingleHistoricalTickerData = this.formatSingleHistoricalTickerData.bind(this)

        this.displayToolTip = this.displayToolTip.bind(this)
    }

    displayToolTip(toolTipData) {
        if (this.currentMarkPriceDOMRef.current) {
            if (toolTipData.payload.length > 0) {
                let hoveredChartPrice = toolTipData.payload[0].payload['price']
                let percentChartChangeToday =  ( ( hoveredChartPrice / this.props.quote["intradayPrices"][0].open ) - 1 ) * 100
                let priceChangeToday = hoveredChartPrice - this.props.quote["intradayPrices"][0].open
                let sign = (hoveredChartPrice > this.props.quote["intradayPrices"][0].open) ? "+" : ""

                this.currentMarkPriceDOMRef.current.classList.add('hideDOMRef')
                this.currentTodayChangePriceDOMRef.current.classList.add('hideDOMRef')
                this.hoverChartPriceDOMRef.current.innerText = `$${hoveredChartPrice.toFixed(2)}`
                this.hoverChartChangePriceDOMRef.current.innerText = `${sign}$${priceChangeToday.toFixed(2)} (${sign}${percentChartChangeToday.toFixed(2)}%)`
            } else {
                this.currentMarkPriceDOMRef.current.classList.remove('hideDOMRef')
                this.currentTodayChangePriceDOMRef.current.classList.remove('hideDOMRef')
                this.hoverChartPriceDOMRef.current.innerText = ''
                this.hoverChartChangePriceDOMRef.current.innerText = ''
            }
        }
        return null;
    }

    componentDidMount() {
        this.props.requestSingleTickerQuote(this.props.tickerName).then(() => 
            this.props.requestSingleTickerKeyStat(this.props.tickerName).then(() =>
                this.props.requestSingleTickerCompany(this.props.tickerName)
            )
        )
        this.state.loading = false
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.tickerName !== this.props.tickerName) {
            this.props.requestSingleTickerQuote(this.props.tickerName).then(() => 
                this.props.requestSingleTickerKeyStat(this.props.tickerName).then(() =>
                    this.props.requestSingleTickerCompany(this.props.tickerName)
                )
            )
            this.setState({chartDate: "1D"})
        }
        else if (prevState.chartDate !== this.state.chartDate && this.state.chartDate !== "1D") {
            this.props.requestSingleTickerHistoricalQuote(this.props.tickerName, this.state.chartDate)
            // this.state.loading = false
        }
    }

    formatOneDayTickerData(intradayPricesArray) {
        if (intradayPricesArray) {
            const formatPriceArray = []; 
            for ( let i = 0; i < intradayPricesArray.length; i++) {
                formatPriceArray.push({time: intradayPricesArray[i].minute, price: intradayPricesArray[i].average})
            }
            return formatPriceArray
        }
    }

    formatSingleHistoricalTickerData(pricesArray) {
        const formatHistoricalPriceArray = [];
        for (let i = 0; i < pricesArray.length; i++) {
            formatHistoricalPriceArray.push({time: pricesArray[i].date, price: pricesArray[i].open})
        }
        return formatHistoricalPriceArray
    }

    render() {
        let chartData;
        if ( this.state.chartDate === "1D" ) {
            chartData = this.formatOneDayTickerData(this.props.quote['intradayPrices']) 
        } 
        if ( this.state.chartDate !== "1D" && ( this.props.historicalQuote !== undefined) ) {
            if (this.props.historicalQuote[this.props.tickerName] !== undefined) {
                chartData = this.formatSingleHistoricalTickerData(this.props.historicalQuote[this.props.tickerName].chart)
            }
        }
        return(
            <div className = "ticker-chart-and-about-container">
                <div className = "ticker-chart-container">
                    <span className = "chart-ticker-name chart-top-about">{this.props.tickerName}</span>
                    <div >
                        <span ref = {this.currentMarkPriceDOMRef} className = "chart-ticker-mark-price chart-top-about">${(this.props.quote.markPrice) ? this.props.quote.markPrice.toFixed(2) : undefined}</span>
                        <span ref = {this.hoverChartPriceDOMRef} className = "chart-ticker-mark-price chart-top-about"></span>
                    </div>
                    <div>
                        <span ref = {this.currentTodayChangePriceDOMRef} className = "chart-ticker-change-percentage chart-top-about">{this.props.quote.changePercentage}% <span>Today</span></span>
                        <span ref = {this.hoverChartChangePriceDOMRef} className = "chart-ticker-change-percentage chart-top-about"></span>
                    </div>
                    <LineChart className = "linechart-container" width = {650} height = {200} data = {chartData} >
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
                        <Tooltip 
                            isAnimationActive = {false}
                            content = {this.displayToolTip}
                            cursor = {{stroke: null}}
                            position={{ y: 50 }}
                            offset = {35}
                            // viewBox={{ x: 0, y: 0, width: 650, height: 200 }}
                        />
                        <Line   
                            className = "recharts-line"
                            type = "monotone"
                            dataKey = "price"
                            stroke = {"rgb(0, 200, 5)"}
                            dot = {false}
                            strokeWidth = {1}
                            activeDot = {{r: 2, stroke: 'rgb(0, 200, 5)', fill: 'rgb(0, 200, 5)'}}
                            type = "linear"/>
                    </LineChart>
                    <div className = "text-container">
                        <div className = "dotted-line-recharts"></div>
                    </div>
                    <div className = "">
                        <ul className = "ticker-page-date-buttons">
                            {
                                ["1D", "1W", "1M", "3M", "1Y", "5Y"].map((date) => (
                                    <button 
                                        key = {date} 
                                        onClick = {() => this.setState({chartDate: date})}>{date}</button>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className = "ticker-about-container">
                    <div className = "ticker-about-word">About</div>
                    {/* <p>{this.props.tickerName} specializes in ABOUT DESCRIPTION</p> */}
                    <div className = "ticker-about-upperdiv">
                        <span className = "inner-upperdiv">Company Name<br/>{this.props.quote.companyName}</span>
                        <span className = "inner-upperdiv">Employees<br/>{this.props.quote.employees}</span>
                        <span className = "inner-upperdiv">Exchange<br/>{this.props.quote.exchange}</span>
                        <span className = "inner-upperdiv">Phone<br/>{this.props.quote.phone}</span>
                    </div>
                    <div className = "ticker-about-lowerdiv">
                        <span className = "inner-lowerdiv">Market Cap<br/>{this.props.quote.marketcap}</span>
                        <span className = "inner-lowerdiv">Next Earnings Date<br/>{this.props.quote.nextEarningDate}</span>
                        <span className = "inner-lowerdiv">30-Day Volume<br/>{this.props.quote.monthlyVolume}</span>
                        <span className = "inner-lowerdiv">Shares Outstanding<br/>{this.props.quote.sharesOutstanding}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Ticker