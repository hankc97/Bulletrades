import React from 'react'
import TickerIndex from './ticker_index'

class PortfolioTickerOrders extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className = "portfolio-ticker-order-container">
                <div className = "ticker-orders-component">
                    <TickerIndex 
                        userOrders = {this.props.userOrders} 
                        tickerArray = {this.props.tickerArray} 
                        quotes = {this.props.quotes}
                        data = {this.props.data}
                    />
                </div>
            </div>
        )
    }
}

export default PortfolioTickerOrders