import React from 'react'
class Dollars extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            amountOfDollars: 0,
            quantity: 0,
            errorsText: "",
            transactionReviewSuccessText: "",
        }

        this.dismissButton = React.createRef()
        this.reviewOrderButton = React.createRef()
        this.depositFunds = React.createRef()
        this.executeSaleButton = React.createRef()
        this.backButton = React.createRef()

        this.handleDollarInputChange = this.handleDollarInputChange.bind(this)
        this.handleReviewOrder = this.handleReviewOrder.bind(this)
        this.executeOrderToBackEnd = this.executeOrderToBackEnd.bind(this)
    }

    componentDidMount() {
        this.setState({saleType: this.props.saleType})
    }

    componentDidUpdate(prevState) {
        if (prevState.saleType !== this.props.saleType) {
            this.resetButtons()
            this.clearError()
            this.setState({estimatedTotalPrice: 0, transactionReviewSuccessText: "", errorsText: "", amountOfDollars: 0})
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
                quantity: this.state.quantity,
                avg_ticker_price: this.props.markPrice,
                sale_type: this.props.saleType
            }
            this.props.createOrder(newUserOrderForm, user_buying_power)
            this.setState({estimatedTotalPrice: 0, transactionReviewSuccessText: "", errorsText: "", amountOfDollars: 0})
            this.resetButtons()
        }

        if (this.props.saleType === "Sell") {
            if (!this.isSharesEqualToZeroAfterSell()) {
                const user_buying_power = {
                    buying_power: currentUser.buyingPower}
                const newUserOrderForm = {
                    user_id: currentUser.id,
                    ticker: this.props.tickerName,
                    quantity: this.state.quantity,
                    avg_ticker_price: this.props.markPrice,
                    sale_type: this.props.saleType
                }
                this.props.updateOrder(newUserOrderForm, user_buying_power)
                this.setState({estimatedTotalPrice: 0, transactionReviewSuccessText: "", errorsText: "", amountOfDollars: 0})
                this.resetButtons()
            } else {
                const mark_price = {
                    mark_price:  this.props.markPrice
                }
                this.props.deleteOrder(this.props.tickerName, mark_price)
                this.setState({estimatedTotalPrice: 0, transactionReviewSuccessText: "", errorsText: "", amountOfDollars: 0})
                this.resetButtons()
            }
        }
    }

    isSharesEqualToZeroAfterSell() {
        const sharesAvailable = this.props.currentUserOrder[1]
        if (this.state.amountOfDollars - sharesAvailable === 0) return true
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

    displaySuccessfulOrderReview(quantity) {
        this.reviewOrderButton.current.classList.remove('review-order-button')
        this.reviewOrderButton.current.classList.add('hide-button')

        this.executeSaleButton.current.classList.remove('hide-button')
        this.executeSaleButton.current.classList.add('reveal-execute-sale-button')

        this.backButton.current.classList.remove('hide-button')
        this.backButton.current.classList.add('reveal-back-button')
        
        this.setState({
            quantity: quantity,
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

    handleDollarInputChange(e) {
        e.preventDefault()
        this.setState({amountOfDollars: e.target.value})
    }

    handleReviewOrder(e) {
        e.preventDefault()
        const quantity = e.currentTarget.firstChild.lastChild.innerHTML 
        const buyingPower = parseFloat(this.props.currentUser.buyingPower)
        if (parseFloat(quantity) <= 1 && (typeof parseFloat(quantity) !== "number")) return this.setState({errorsText: "Please Enter A Valid Amount of Dollars over $1.00"})
        const totalPrice = parseFloat(this.state.amountOfDollars)
        if (this.props.saleType === "Buy") {
            if (buyingPower < totalPrice) return this.displayError()
            if (buyingPower >= totalPrice) return this.displaySuccessfulOrderReview(quantity)
        }

        if (this.props.saleType === "Sell") {
            const sharesAvailable = this.props.currentUserOrder[1]
            if (sharesAvailable < quantity) return this.displayError()
            if (sharesAvailable >= quantity) return this.displaySuccessfulOrderReview(quantity)
        }
    }

    getDecimalCount(quantity) {
        if (Math.floor(quantity) === quantity) return 0
        return quantity.toString().split(".")[1].length || 0
    }

    render() {
        const {errorsText, transactionReviewSuccessText, amountOfDollars}  = this.state
        const {saleType} = this.props
        const markPrice = this.props.markPrice || 0 
        let estimatedQuantityOfShares = ( amountOfDollars / markPrice ) 
        if (this.getDecimalCount(estimatedQuantityOfShares) > 6) estimatedQuantityOfShares = estimatedQuantityOfShares.toFixed(6)

        return(
            <div className = "outer-bottom-div-container">
                <div className = "dollars-input-container">
                    <label>Amount</label>
                    <input 
                        type = "number"
                        placeholder = "$0.00"
                        value = {this.state.amountOfDollars}
                        onChange = {this.handleDollarInputChange}
                    />
                </div>
                <form className = "dollars-form-container" onSubmit = {this.handleReviewOrder}>
                    <div className = "estimated-shares-from-dollar-amount">
                        <label>Est. Quantity</label>
                        <span>{estimatedQuantityOfShares}</span>
                    </div>
                    <p className = "errors-text">{errorsText}</p>
                    <p className = "successful-order-review-text">{transactionReviewSuccessText}</p>
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

export default Dollars