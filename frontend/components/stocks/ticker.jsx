import React from 'react'
import SideBarTicker from './sidebar/sidebar_ticker'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceArea} from 'recharts';

class Ticker extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className = "main-ticker-page-container">
                <TickerChartAbout 
                    requestSingleTickerQuote = {this.props.requestSingleTickerQuote} 
                    requestSingleTickerKeyStat = {this.props.requestSingleTickerKeyStat}
                    requestSingleTickerCompany = {this.props.requestSingleTickerCompany}
                    tickerName = {this.props.tickerName} 
                    quote = {this.props.quote}
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
        )
    }
}

class TickerChartAbout extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
        }

        this.formatOneDayTickerData = this.formatOneDayTickerData.bind(this)
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
                    <XAxis  dataKey = "time" 
                            hide = {true}/>

                    <YAxis  type =  "number" 
                            hide = {true} 
                            domain={['auto', 'auto']}/>

                    <Line   type = "linear"
                            dataKey = "price"
                            stroke = "#32cd32"
                            dot = {false}
                            strokeWidth = {1}
                    />
                    <Tooltip />
                </LineChart>
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