import React from 'react'
import {LineChart, Line, XAxis, YAxis, Tooltip} from 'recharts';
import {Audio} from "@agney/react-loading";

class PortfolioMain extends React.Component {
    constructor(props) {
        super(props) 

        this.state = {
            chartDate: "1D",
            buyingPowerRevealed: false,
            loading: true,
        }

        this.currentUserOrderHoldingAmountDOMRef = React.createRef()
        this.totalReturnDollarAndPercentageDOMRef = React.createRef()
        this.hoverChartPriceDOMRef = React.createRef()
        this.hoverChartChangePriceDOMRef = React.createRef()
        this.buyingPowerContainerDOMRef = React.createRef()
        this.buyingPowerAmountDOMRef = React.createRef()
        this.buyingPowerExtensionDOMRef = React.createRef()

        this.displayToolTip = this.displayToolTip.bind(this)
        this.asynchLoadingTimer = this.asynchLoadingTimer.bind(this)
    }

    componentDidMount() {
        this.props.fetchCurrentUserAndFormattedLifetimeTrades()
            .then(() => this.asynchLoadingTimer().then(() => this.setState({loading: false})))
    }

    asynchLoadingTimer() {
        return new Promise((resolve) => setTimeout(() => resolve(), 1500));
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currentUser === undefined) return
        if (prevState.buyingPowerRevealed !== this.state.buyingPowerRevealed) {
            if (this.state.buyingPowerRevealed === false) {
                this.buyingPowerAmountDOMRef.current.classList.remove("hide-buying-power-value")
                this.buyingPowerExtensionDOMRef.current.classList.add('buying-power-hidden')
                this.buyingPowerExtensionDOMRef.current.classList.remove('buying-power-reveal')
                this.buyingPowerContainerDOMRef.current.classList.remove('background-color-grey')
            }
            if (this.state.buyingPowerRevealed === true) {
                this.buyingPowerAmountDOMRef.current.classList.add("hide-buying-power-value")
                this.buyingPowerExtensionDOMRef.current.classList.remove('buying-power-hidden')
                this.buyingPowerExtensionDOMRef.current.classList.add('buying-power-reveal')
                this.buyingPowerContainerDOMRef.current.classList.add('background-color-grey')
            }
        }

        if (prevState.chartDate !== this.state.chartDate) {
            this.props.fetchCurrentUserAndFormattedLifetimeTrades(this.state.chartDate)
        }
        if (prevProps.currentUser.buyingPower !== this.props.currentUser.buyingPower) {
            this.props.fetchCurrentUserAndFormattedLifetimeTrades(this.state.chartDate)
        }
    }

    displayToolTip(toolTipData) {
        if (this.totalReturnDollarAndPercentageDOMRef.current) {
            if (toolTipData.payload.length > 0) {
                let hoveredChartPrice = parseFloat(toolTipData.payload[0].payload['price'])
                let percentChartChangeToday =  ( ( hoveredChartPrice / this.props.formattedLifetimeTradesStartingAmount ) - 1 ) * 100
                let priceChangeToday = hoveredChartPrice - this.props.formattedLifetimeTradesStartingAmount
                let sign = (hoveredChartPrice > this.props.formattedLifetimeTradesStartingAmount) ? "+" : ""

                this.currentUserOrderHoldingAmountDOMRef.current.classList.add('hideDOMRef')
                this.totalReturnDollarAndPercentageDOMRef.current.classList.add('hideDOMRef')
                this.hoverChartPriceDOMRef.current.innerText = `$${hoveredChartPrice.toFixed(2)}`
                this.hoverChartChangePriceDOMRef.current.innerText = `${sign}$${priceChangeToday.toFixed(2)} (${sign}${percentChartChangeToday.toFixed(2)}%)`
            } else {
                this.currentUserOrderHoldingAmountDOMRef.current.classList.remove('hideDOMRef')
                this.totalReturnDollarAndPercentageDOMRef.current.classList.remove('hideDOMRef')
                this.hoverChartPriceDOMRef.current.innerText = ''
                this.hoverChartChangePriceDOMRef.current.innerText = ''
            }
        }
        return null;
    }

    render() {
        const {loading} = this.state
        if (loading) {
            return (<div className = "loader-background"><Audio className = "loader"/></div>)
        }

        let color;
        const {formattedLifetimeTradesStartingAmount, currentUserOrderHoldingAmount} = this.props
        const dollarReturnPrice = (currentUserOrderHoldingAmount - formattedLifetimeTradesStartingAmount).toFixed(2)
        const percentageChanged = (((currentUserOrderHoldingAmount / formattedLifetimeTradesStartingAmount) - 1 ) * 100).toFixed(2)
        const totalReturnDollarAndPercentageFormat = (currentUserOrderHoldingAmount > formattedLifetimeTradesStartingAmount)  ? `+${dollarReturnPrice} (+${percentageChanged}%)` : `${dollarReturnPrice} (${percentageChanged}%)`
        color = (percentageChanged > 0) ? "rgb(0, 200, 5)" : 'rgb(255,80,0)'

        let min, max
        if (this.props.formattedMinAndMaxValueFromDataSet) {
            min = this.props.formattedMinAndMaxValueFromDataSet[0]
            max = this.props.formattedMinAndMaxValueFromDataSet[1]
        }

        const buyingPower = (this.props.currentUser) ? parseFloat(this.props.currentUser.buyingPower).toFixed(2) : ""

        let chartData; 
        if (this.props.formattedLifetimeTrades) chartData = this.props.formattedLifetimeTrades
        
        return(
            <div className = "portfolio-main">
                <div className = "buying-power-top-info">
                    <div className = "buying-power-total-holdings">
                        <p ref = {this.currentUserOrderHoldingAmountDOMRef} >${currentUserOrderHoldingAmount ? currentUserOrderHoldingAmount.toFixed(2) : ""}</p>
                        <p ref = {this.hoverChartPriceDOMRef} className = ""></p>
                    </div>
                    <div className = "buying-power-total-change">
                        <span ref = {this.totalReturnDollarAndPercentageDOMRef} >{totalReturnDollarAndPercentageFormat} <span className = "today">Today</span></span>
                        <span ref = {this.hoverChartChangePriceDOMRef} className = ""></span>
                    </div>
                </div>
                <LineChart className = "portfolio-line-chart" width = {650} height = {200} data = {chartData}>
                    <XAxis  
                        dataKey = "time"
                        hide = {true}
                        domain={['auto', 'auto']}
                    />
                    <YAxis  
                        type = "number" 
                        hide = {true} 
                        domain={[min, max]} 
                        allowDataOverflow={true}
                    />
                    <Tooltip 
                        isAnimationActive = {false}
                        content = {this.displayToolTip}
                        cursor = {{stroke: null}}
                        position={{ y: 50 }}
                        offset = {35}
                    />
                    <Line   
                        type = "monotone"
                        dataKey = "price"
                        stroke = {color}
                        dot = {false}
                        strokeWidth = {1}
                        activeDot = {{r: 2, stroke: color, fill: color}}
                        type = "linear"/>
                </LineChart>
                <ul className = "portfolio-page-date-button">
                    {
                        ["1D", "1W", "1M", "3M", "1Y", "5Y"].map((date) => (
                            <button 
                                key = {date} 
                                onClick = {() => this.setState({chartDate: date})}>{date}</button>
                        ))
                    }
                </ul>
                <div ref = {this.buyingPowerContainerDOMRef} className = "buying-power-container">
                    <div className = "buying-power-always" onClick = {() => {this.setState({buyingPowerRevealed: !this.state.buyingPowerRevealed})}}>
                        <span>Buying Power</span>
                        <p ref = {this.buyingPowerAmountDOMRef} className = "buying-power-value">${buyingPower}</p>
                    </div>
                    <div ref = {this.buyingPowerExtensionDOMRef} className = "buying-power-hidden">
                        <div className = "buying-power-left">
                            <div>
                                <span>Buying Power</span>
                                <span>${buyingPower}</span>
                            </div>
                            <span>Get More Buying Power with Margin</span>
                            <button className = "portfolio-deposit-funds-button" 
                                    onClick = {() => this.props.openModal('deposit')}>Deposit Funds</button>
                        </div>
                        <p className = "buying-power-right">Buying Power represents the total value of stocks you can purchase.</p>
                    </div>
                </div>
                <div className = "portfolio-news">
                    <span>News</span>
                    <ul></ul>
                </div>
            </div>
        )
    }
}

export default PortfolioMain