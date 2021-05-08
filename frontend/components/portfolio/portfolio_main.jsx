import React from 'react'
import {LineChart, Line, XAxis, YAxis, Tooltip} from 'recharts';

class PortfolioMain extends React.Component {
    constructor(props) {
        super(props) 

        this.state = {
            chartDate: "1D",
        }

        this.currentUserOrderHoldingAmountDOMRef = React.createRef()
        this.totalReturnDollarAndPercentageDOMRef = React.createRef()
        this.hoverChartPriceDOMRef = React.createRef()
        this.hoverChartChangePriceDOMRef = React.createRef()

        this.displayToolTip = this.displayToolTip.bind(this)
    }

    componentDidMount() {
        this.props.fetchCurrentUserAndFormattedLifetimeTrades()
    }

    componentDidUpdate() {

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
        const {formattedLifetimeTradesStartingAmount, currentUserOrderHoldingAmount} = this.props
        const dollarReturnPrice = (currentUserOrderHoldingAmount - formattedLifetimeTradesStartingAmount).toFixed(2)
        const percentageChanged = (((currentUserOrderHoldingAmount / formattedLifetimeTradesStartingAmount) - 1 ) * 100).toFixed(2)
        const totalReturnDollarAndPercentageFormat = (currentUserOrderHoldingAmount > formattedLifetimeTradesStartingAmount)  ? `+${dollarReturnPrice} (+${percentageChanged}%)` : `${dollarReturnPrice} (${percentageChanged}%)`

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
                        domain={[0, this.props.formattedMaxValueFromDataSet]}
                        allowDataOverflow={true}
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
                        // className = "recharts-line"
                        type = "monotone"
                        dataKey = "price"
                        stroke = {"rgb(0, 200, 5)"}
                        dot = {false}
                        strokeWidth = {1}
                        activeDot = {{r: 2, stroke: 'rgb(0, 200, 5)', fill: 'rgb(0, 200, 5)'}}
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
            </div>
        )
    }
}

export default PortfolioMain