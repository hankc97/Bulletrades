import React from 'react';
import TickerIndexItem from './ticker_index_item'

class TickerIndex extends React.Component {
    constructor(props) {
        super(props);


    }

    render() {
        return(
            <div className="ticker-index-container">
                <div className="ticker-index-title">
                    <h2 className = "ticker-index-header">Stocks</h2>
                </div>
                <div>
                    <ul className = "ticker-index-list">   
                        {this.props.tickerArray.map((ticker) => {
                            return (
                                <TickerIndexItem 
                                    key = {ticker}
                                    ticker = {ticker}
                                    userOrders = {this.props.userOrders} 
                                    data = {this.props.data}
                                    quotes = {this.props.quotes}
                                    tickerPrice = {this.props.userOrders[ticker.charAt(0).toLowerCase() + ticker.slice(1)].avgTickerPrice}
                                    quantity = {this.props.userOrders[ticker.charAt(0).toLowerCase() + ticker.slice(1)].quantity}
                                />
                            )
                        })}
                    </ul>
                </div>
            </div>

        )
    }
}

export default TickerIndex