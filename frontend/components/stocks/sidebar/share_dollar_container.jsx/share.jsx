import React from 'react'

class BuySharesFormInner extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            estimatedTotalCost: 0,
            shareNumber: 0,
            prevShareNumber: 0,
            hasTicker: this.props.hasTicker
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleBuySubmit = this.handleBuySubmit.bind(this)
        this.handleSellSubmit = this.handleSellSubmit.bind(this)
        this.handleErrors = this.handleErrors.bind(this)
    }

    componentDidUpdate(prevProps) {
        let markPrice;
        (!this.props.markPrice) ? markPrice = 0 : markPrice = this.props.markPrice;
        if (prevProps.tickerName !== this.props.tickerName || prevProps.buyingPower !== (this.props.buyingPower - (this.state.prevShareNumber * markPrice))) {
            if ((this.props.tickerName.charAt(0).toLowerCase() + this.props.tickerName.slice(1) in this.props.userOrders) || (this.props.tickerName in this.props.userOrders)) {
                this.setState({hasTicker: true, prevShareNumber: 0})
            } else {
                this.setState({hasTicker: false, prevShareNumber: 0})
            }
        }
    }

    handleBuySubmit(e) {
        e.preventDefault()
        if (this.props.buyingPower < this.state.estimatedTotalCost) return this.handleErrors()
        if (this.props.buyingPower >= this.state.estimatedTotalCost) {
            const totalQuantity = this.state.shareNumber + this.props.quantity 
            const user_buying_power = {
                buying_power: (this.props.buyingPower - (this.state.shareNumber * this.props.markPrice))}
            if (!this.state.hasTicker) {
                const new_user_orders = {
                    user_id: this.props.id,
                    ticker: this.props.tickerName,
                    quantity: this.state.shareNumber,
                    avg_ticker_price: this.props.markPrice
                }
                this.props.addOrder(new_user_orders, user_buying_power)
            }

            if (this.state.hasTicker){
                const updated_user_orders = {
                    user_id: this.props.id,
                    ticker: this.props.tickerName,
                    quantity: this.props.quantity + this.state.shareNumber,
                    avg_ticker_price: (this.props.markPrice + this.props.avgTickerPrice) / 2
                }
                this.props.updateOrder(updated_user_orders, user_buying_power)
            }
            this.setState({shareNumber: 0, prevShareNumber: totalQuantity})
        }
    }

    handleSellSubmit(e) {
        e.preventDefault()
        if (this.props.buyingPower < 0) return this.handleErrors()
        if (this.props.buyingPower) {
            const totalQuantity = this.props.quantity - this.state.shareNumber 
            const user_buying_power = {
                buying_power: (this.props.buyingPower + (this.state.shareNumber * this.props.markPrice))}

            // if (this.props.quantity - this.state.shareNumber === 0) {
            //     const formattedTickerName = this.props.tickerName.charAt(0).toLowerCase() + this.props.tickerName.slice(1)
            //     this.props.deleteOrder(formattedTickerName, this.props.userOrders.tickerId)
            //     this.setState({hasTicker: false})
            // }

            if (this.props.quantity - this.state.shareNumber >= 0) {
                const updated_user_orders = {
                    user_id: this.props.id,
                    ticker: this.props.tickerName,
                    quantity: this.props.quantity - this.state.shareNumber,
                    avg_ticker_price: (this.props.markPrice + this.props.avgTickerPrice) / 2
                }
                this.props.updateOrder(updated_user_orders, user_buying_power)
            }
            this.setState({shareNumber: 0, prevShareNumber: totalQuantity})
        }

    }

    handleChange(e) {
        
        if (e.currentTarget.value === "") return this.setState({shareNumber: 0})
        this.setState({
            shareNumber: parseFloat(e.currentTarget.value),
            estimatedTotalCost: (this.state.shareNumber),
        })
    }

    handleErrors() {

    }

    render() {
        return(
            <div>
                {this.props.buyButton ? (
                    <form onSubmit = {this.handleBuySubmit} className = "shares-form-inner">
                        <div className = "share-label-input">
                            <label>Shares</label>
                            <input
                                className = "shares-input-box"
                                type = "number"
                                placeholder = '0'
                                onChange = {this.handleChange}
                                value = {this.state.shareNumber}
                            />
                        </div>
                        <div className = "share-market-price">
                            <span>Market Price</span>
                            <span>${this.props.markPrice}</span>
                        </div>
                        <div className = "share-estimated-cost">
                            <span>Estimated Cost</span>
                            <span>${(this.state.shareNumber * this.props.markPrice).toFixed(2)}</span>
                        </div>
                        <button className = "share-button-inner" >Buy Shares</button>
                    </form>
                ) : (
                    <form onSubmit = {this.handleSellSubmit} 
                            className = "shares-form-inner">
                        <div className = "share-label-input">
                            <label>Shares</label>
                            <input 
                                className = "shares-input-box"
                                type = "number"
                                placeholder = "0"
                                onChange = {this.handleChange}
                                value = {this.state.shareNumber}
                            />
                        </div>
                        <div className = "share-market-price">
                            <span>Market Price</span>
                            <span>${this.props.markPrice}</span>
                        </div>
                        <div className = "share-estimated-cost">
                            <span>Estimated Credit</span>
                            <span>${(this.state.shareNumber * this.props.markPrice).toFixed(2)}</span>
                        </div>
                        <button className = "share-button-inner">Sell Shares</button>
                    </form> 
                )}
            </div>
        )
    }
}

// class SellSharesFormInner extends React.Component {


// }

export default BuySharesFormInner