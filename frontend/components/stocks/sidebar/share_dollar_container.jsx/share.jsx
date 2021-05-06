import React from 'react'

class Shares extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            numberOfShares: 0,
            estimatedTotalPrice: 0,
            errorsText: "",
            transactionReviewSuccessText: "",
        }

        this.dismissButton = React.createRef()
        this.reviewOrderButton = React.createRef()
        this.depositFunds = React.createRef()
        this.executeSaleButton = React.createRef()
        this.backButton = React.createRef()

        this.handleShareInputChange = this.handleShareInputChange.bind(this)
        this.handleReviewOrder = this.handleReviewOrder.bind(this)
        this.resetButtons = this.resetButtons.bind(this)
        this.clearError = this.clearError.bind(this)
        this.executeOrderToBackEnd = this.executeOrderToBackEnd.bind(this)
    }

    componentDidMount() {
        this.setState({saleType: this.props.saleType})
    }

    componentDidUpdate(prevState) {
        if (prevState.saleType !== this.props.saleType) {
            this.resetButtons()
            this.clearError()
            this.setState({estimatedTotalPrice: 0, transactionReviewSuccessText: "", errorsText: "", numberOfShares: 0})
        }
    }

    executeOrderToBackEnd() {
        const currentUser = this.props.currentUser

        if (this.props.saleType === "Buy") {
            const user_buying_power = {
                buying_power: currentUser.buyingPower}
            const newUserOrderForm = {
                user_id: currentUser.id,
                ticker: this.props.tickerName,
                quantity: this.state.numberOfShares,
                avg_ticker_price: this.state.estimatedTotalPrice / this.state.numberOfShares,
                sale_type: this.props.saleType
            }
            this.props.createOrder(newUserOrderForm, user_buying_power)
            this.setState({estimatedTotalPrice: 0, transactionReviewSuccessText: "", errorsText: "", numberOfShares: 0})
            this.resetButtons()
        }

        if (this.props.saleType === "Sell") {
            if (!this.isSharesEqualToZeroAfterSell()) {
                const user_buying_power = {
                    buying_power: currentUser.buyingPower}
                const newUserOrderForm = {
                    user_id: currentUser.id,
                    ticker: this.props.tickerName,
                    quantity: this.state.numberOfShares,
                    avg_ticker_price: this.state.estimatedTotalPrice / this.state.numberOfShares,
                    sale_type: this.props.saleType
                }
                this.props.updateOrder(newUserOrderForm, user_buying_power)
                this.setState({estimatedTotalPrice: 0, transactionReviewSuccessText: "", errorsText: "", numberOfShares: 0})
                this.resetButtons()
            } else {
                const mark_price = {
                    mark_price:  this.props.markPrice
                }
                this.props.deleteOrder(this.props.tickerName, mark_price)
                this.setState({estimatedTotalPrice: 0, transactionReviewSuccessText: "", errorsText: "", numberOfShares: 0})
                this.resetButtons()
            }
        }
    }

    isSharesEqualToZeroAfterSell() {
        const sharesAvailable = this.props.currentUserOrder[1]
        if (this.state.numberOfShares - sharesAvailable === 0) return true
        return false
    }

    resetButtons() {
        this.reviewOrderButton.current.classList.add('review-order-button')
        this.reviewOrderButton.current.classList.remove('hide-button')

        this.executeSaleButton.current.classList.add('hide-button')
        this.executeSaleButton.current.classList.remove('reveal-execute-sale-button')

        this.backButton.current.classList.add('hide-button')
        this.backButton.current.classList.remove('reveal-back-button')
    }

    clearError() {
        this.dismissButton.current.classList.add('hide-button')
        this.dismissButton.current.classList.remove('reveal-dismiss-button')

        this.reviewOrderButton.current.classList.add('review-order-button')
        this.reviewOrderButton.current.classList.remove('hide-button')

        this.depositFunds.current.classList.add('hide-button')
        this.depositFunds.current.classList.remove('reveal-deposit-funds')
    }

    handleShareInputChange(e) {
        e.preventDefault()
        this.setState({numberOfShares: e.target.value})
    }

    handleReviewOrder(e) {
        e.preventDefault()
        const totalPrice = parseFloat(e.currentTarget.firstChild.lastChild.innerHTML)
        if (parseInt(this.state.numberOfShares) === 0) return this.setState({errorsText: "Please enter a valid number of shares"})

        if (this.props.saleType === "Buy") {
            if (this.props.currentUser.buyingPower < totalPrice) return this.displayError()
            if (this.props.currentUser.buyingPower >= totalPrice) return this.displaySuccessfulOrderReview(totalPrice)
        }

        if (this.props.saleType === "Sell") {
            const sharesAvailable = this.props.currentUserOrder[1]
            if (sharesAvailable < this.state.numberOfShares) return this.displayError()
            if (sharesAvailable >= this.state.numberOfShares) return this.displaySuccessfulOrderReview(totalPrice)
        }
    }

    displaySuccessfulOrderReview(totalPrice) {
        this.reviewOrderButton.current.classList.remove('review-order-button')
        this.reviewOrderButton.current.classList.add('hide-button')

        this.executeSaleButton.current.classList.remove('hide-button')
        this.executeSaleButton.current.classList.add('reveal-execute-sale-button')

        this.backButton.current.classList.remove('hide-button')
        this.backButton.current.classList.add('reveal-back-button')
        
        this.setState({
            estimatedTotalPrice: totalPrice,
            transactionReviewSuccessText: "Successful Order Review. Please Execute Order Or Click Back To Continue Editing Order",
            errorsText: "",
        })
    }

    displayError() {
        this.dismissButton.current.classList.remove('hide-button')
        this.dismissButton.current.classList.add('reveal-dismiss-button')

        this.reviewOrderButton.current.classList.remove('review-order-button')
        this.reviewOrderButton.current.classList.add('hide-button')

        if (this.props.saleType === "Buy") {
            this.depositFunds.current.classList.remove('hide-button')
            this.depositFunds.current.classList.add('reveal-deposit-funds')

            this.setState({
                estimatedTotalPrice: 0, 
                errorsText: "Not Enough Buying Power. Please Deposit Funds Below"
        })}

        if (this.props.saleType === "Sell") {
            this.setState({
                estimatedTotalPrice: 0, 
                errorsText: `Not Enough Shares Available. You can only sell ${this.props.currentUserOrder[1].toFixed(7)} shares`
        })}
    }

    render() {
        const {errorsText, transactionReviewSuccessText, numberOfShares}  = this.state
        const {saleType} = this.props
        const markPrice = this.props.markPrice || 0 
        const estimatedTextType = (saleType === "Buy") ? "Estimated Cost" : "Estimated Credit"
        const totalOrderCost = numberOfShares * markPrice 

        return(
            <div className = "outer-bottom-div-container">
                <div className = "shares-input-container">
                    <label>Shares</label>
                    <input
                        type = "number"
                        placeholder = "0"
                        value = {this.state.numberOfShares}
                        onChange = {this.handleShareInputChange}
                    />
                </div>
                <div className = "mark-price-container">
                    <label>Market Price</label>
                    <span>${markPrice.toFixed(2)}</span>
                </div>
                <form onSubmit = {this.handleReviewOrder}>
                    <div className = "total-cost-price-container">
                        <label>{estimatedTextType}</label>
                        <span>${totalOrderCost.toFixed(2)}</span>
                    </div>
                    <p className = "errors-text">{errorsText}</p>
                    <p>{transactionReviewSuccessText}</p>
                    <button ref = {this.reviewOrderButton} className = "review-order-button">Review Order</button>
                </form>

                <>
                    <button ref = {this.executeSaleButton} 
                            onClick = {this.executeOrderToBackEnd}
                            className = "hide-button">Execute {saleType}</button>
                    <button ref = {this.backButton} 
                            onClick = {() => {
                                this.resetButtons()
                                this.setState({estimatedTotalPrice: 0, transactionReviewSuccessText: ""})
                            }}
                            className = "hide-button">Back</button>
                </>

                <>
                    <button ref = {this.depositFunds} className = "hide-button">Deposit Funds</button>
                    <button 
                        onClick = {() => {
                            this.clearError()
                            this.setState({estimatedTotalPrice: 0, errorsText: ""})
                        }} 
                        ref = {this.dismissButton} 
                        className = "hide-button">Dismiss</button>
                </>
            </div>
        )
    }
}


export default Shares