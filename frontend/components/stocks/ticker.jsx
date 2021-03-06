import React from 'react'
import SideBarTicker from './sidebar/sidebar_container'
import {LineChart, Line, XAxis, YAxis, Tooltip} from 'recharts';
import {Audio} from "@agney/react-loading";

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
                        requestSingleTickerNews = {this.props.requestSingleTickerNews}
                        tickerName = {this.props.tickerName} 
                        quote = {this.props.quote}
                        news = {this.props.news}
                        historicalQuote = {this.props.historicalQuote}
                        receiveSingleCurrentUserOrders = {this.props.receiveSingleCurrentUserOrders}
                        portfolioPercentageValue = {this.props.portfolioPercentageValue}
                        currentUserOrder = {this.props.currentUserOrder}
                        tickerNews = {this.props.tickerNews}
                    />
                    <SideBarTicker 
                        currentUser = {this.props.currentUser}
                        markPrice = {this.props.quote.markPrice}
                        tickerName = {this.props.tickerName}
                        createOrder = {this.props.createOrder}
                        updateOrder = {this.props.updateOrder}
                        deleteOrder = {this.props.deleteOrder}
                        userOrders = {this.props.userOrders}
                        currentUserOrder = {this.props.currentUserOrder}
                        updateOrder = {this.props.updateOrder}
                        deleteOrder = {this.props.deleteOrder}
                        openModal = {this.props.openModal}
                        requestShowTickerWatchlistRelation = {this.props.requestShowTickerWatchlistRelation}
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
        this.tickerOwnedPositionContainer = React.createRef()

        this.formatOneDayTickerData = this.formatOneDayTickerData.bind(this)
        this.formatSingleHistoricalTickerData = this.formatSingleHistoricalTickerData.bind(this)

        this.displayToolTip = this.displayToolTip.bind(this)
        this.asynchLoadingTimer = this.asynchLoadingTimer.bind(this)
    }

    displayToolTip(toolTipData) {
        if (this.currentMarkPriceDOMRef.current) {
            if (!toolTipData.payload) {
                return null;
            }
            if (toolTipData.payload.length > 0) {
                const openingPrice = this.props.quote['intradayPrices'][0].open
                let hoveredChartPrice = toolTipData.payload[0].payload['price']
                let percentChartChangeToday =  ( ( hoveredChartPrice / openingPrice ) - 1 ) * 100
                let priceChangeToday = hoveredChartPrice - openingPrice
                let sign = (hoveredChartPrice > openingPrice) ? "+" : ""

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
        const _this = this;
        Promise.all([
            this.props.requestSingleTickerQuote([this.props.tickerName]),
            this.props.requestSingleTickerKeyStat(this.props.tickerName),
            this.props.requestSingleTickerCompany(this.props.tickerName),
            this.props.receiveSingleCurrentUserOrders(this.props.tickerName),
            this.props.requestSingleTickerNews(this.props.tickerName)
        ]).then( ([res1, res2, res3, res4, res5]) => {
            if (Object.keys(res4.payload).length === 2) {
                _this.asynchLoadingTimer().then(() => _this.setState({loading: false, hasTicker: true}))
            } else {
                _this.asynchLoadingTimer().then(() => _this.setState({loading: false, hasTicker: false}))
            }
        }).catch(err => console.log(err.responseText))
    }

    asynchLoadingTimer() {
        return new Promise((resolve) => setTimeout(() => resolve(), 500));
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.tickerOwnedPositionContainer.current !== null) {
            if (this.state.hasTicker){
                this.tickerOwnedPositionContainer.current.classList.remove('hide')
            }
            if (!this.state.hasTicker) {
                this.tickerOwnedPositionContainer.current.classList.add('hide')
            }
        }
        if ( prevProps.currentUserOrder !== this.props.currentUserOrder) {
            if (this.props.currentUserOrder ){
                this.setState({hasTicker: true})
            }
            if (!this.props.currentUserOrder) {
                this.setState({hasTicker: false})
            }
        }
        if (prevProps.tickerName !== this.props.tickerName) {
            this.props.requestSingleTickerQuote(this.props.tickerName).then(() => 
                this.props.requestSingleTickerKeyStat(this.props.tickerName).then(() =>
                    this.props.requestSingleTickerCompany(this.props.tickerName)))
                        .then(() => this.props.requestSingleTickerNews(this.props.tickerName))
                        .then(() => this.props.receiveSingleCurrentUserOrders(this.props.tickerName))
            this.setState({chartDate: "1D"})
        }
        else if (prevState.chartDate !== this.state.chartDate && this.state.chartDate !== "1D") {
            this.props.requestSingleTickerHistoricalQuote(this.props.tickerName, this.state.chartDate)
            this.asynchLoadingTimer().then(() => this.setState({loading: false}))
        }
    }

    formatOneDayTickerData(intradayPricesArray) {
        if (intradayPricesArray) {
            const formatPriceArray = []; 
            for ( let i = 0; i < intradayPricesArray.length; i+=5) {
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

    convertToHoursFromZuluCurrentTime(zuluTime) {
        return parseInt((Date.parse(new Date()) - Date.parse(zuluTime)) / 3600000)
    }

    render() {
        const {loading} = this.state
        if (loading && this.props.quote !== undefined) {
            return (<div className = "loader-background"><Audio className = "loader"/></div>)
        }

        let chartData;
        let news;
        if ( this.state.chartDate === "1D" ) {
            chartData = this.formatOneDayTickerData(this.props.quote['intradayPrices']) 
        } 
        if ( this.state.chartDate !== "1D" && ( this.props.historicalQuote !== undefined) ) {
            if (this.props.historicalQuote[this.props.tickerName] !== undefined) {
                chartData = this.formatSingleHistoricalTickerData(this.props.historicalQuote[this.props.tickerName].chart)
            }
        }
        let numberOfSharesAvailable
        let totalAvgPrice
       
        if (this.props.currentUserOrder) {
            numberOfSharesAvailable = this.props.currentUserOrder[1]
            totalAvgPrice = this.props.currentUserOrder[0].toFixed(2)
        }

        let dollarReturnPrice = (totalAvgPrice - this.props.quote.markPrice).toFixed(2)
        let percentChangePrice = ((( totalAvgPrice / this.props.quote.markPrice ) - 1 ) * 100).toFixed(2)
        let totalReturnValues = (totalAvgPrice > this.props.quote.markPrice) ? `+${dollarReturnPrice} (+${percentChangePrice}%)` : `${dollarReturnPrice} (${percentChangePrice}%)`

        let tickerNews 
        if (this.props.tickerNews) {
            tickerNews = this.props.tickerNews.map(singleNews => {
                return (
                    <a href = {singleNews.source.url} key = {singleNews.title} target="_blank">
                        <div className = "ssingle-portfolio-news-container">
                            <div className = "portfolio-news-about">
                                <div className = "portfolio-name-and-publishedat">
                                    <span>{singleNews.source.name}</span>
                                    <p>{this.convertToHoursFromZuluCurrentTime(singleNews.publishedAt)}h</p>
                                </div>
                                <span className = "single-portfolio-title">{singleNews.title}</span>
                                <p className = "single-portfolio-description">{singleNews.description}</p>
                            </div>
                            <img 
                                draggable="false" 
                                role="presentation" 
                                srcSet = {singleNews.image}
                                className = "portfolio-news-img"
                            />
                        </div>
                    </a>
                )
        })}

        let totalMarketValue
        if (numberOfSharesAvailable) totalMarketValue = (this.props.quote.markPrice * numberOfSharesAvailable).toFixed(2)
        return(
            <div className = "ticker-chart-and-about-container">
                <div className = "ticker-chart-container">
                    <span className = "chart-ticker-name chart-top-about">{this.props.quote.companyName}</span>
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
                                        onClick = {() => this.setState({chartDate: date, loading: true})}>{date}</button>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div ref = {this.tickerOwnedPositionContainer} className = "ticker-owned-position-container">
                    <div className = "ticker-owned-divs">
                        <p>Total Market Value</p>
                        <span className = "inner-font-bold">${totalMarketValue}</span>
                        <div>
                            <span>Today's Return</span>
                            <span>{(this.props.quote.changePercentage) ? this.props.quote.changePercentage.toFixed(2) : ""}% <span>Today</span></span>
                        </div>
                        <div className = "last-div">
                            <span>Total Return</span>
                            <span >{totalReturnValues}</span>
                        </div>
                    </div>
                    <div className = "ticker-owned-divs">
                        <p>Your Average Cost</p>
                        <span className = "inner-font-bold">${totalAvgPrice}</span>
                        <div>
                            <span>Shares</span>
                            <span>{numberOfSharesAvailable}</span>
                        </div>
                        <div className = "last-div">
                            <span>Portfolio Diversity</span>
                            <span >{(this.props.portfolioPercentageValue) ? this.props.portfolioPercentageValue.toFixed(2) : ""}%</span>
                        </div>
                    </div>
                </div>
                <div className = "ticker-about-container">
                    <div className = "ticker-about-text">About</div>
                    <div className = "about-index">
                        <div>
                            <span>Company Name</span>
                            <p>{this.props.quote.companyName}</p>
                        </div>
                        <div>
                            <span>Employees</span>
                            <p>{this.props.quote.employees}</p>
                        </div>
                        <div>
                            <span>Exchange</span>
                            <p>{this.props.quote.exchange}</p>
                        </div>
                        <div>
                            <span>Phone</span>
                            <p>{this.props.quote.phone}</p>
                        </div>
                    </div>
                </div>
                <div className = "ticker-keystats-container">
                    <div className = "ticker-keystats-text">Key Statistics</div>
                    <div className = "keystats-index">
                        <div>
                            <span>Market Cap</span>
                            <p>{this.props.quote.marketcap}</p>
                        </div>
                        <div>
                            <span>peRatio</span>
                            <p>{this.props.quote.peRatio}</p>
                        </div>
                        <div>
                            <span>30-Day Volume</span>
                            <p>{this.props.quote.monthlyVolume}</p>
                        </div>
                        <div>
                            <span>Shares Outstanding</span>
                            <p>{this.props.quote.sharesOutstanding}</p>
                        </div>
                    </div>
                </div>
                <div className = "ticker-news">
                    <span className = "ticker-news-text">News</span>
                    <ul className = "ticker-news-container">
                        {tickerNews}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Ticker