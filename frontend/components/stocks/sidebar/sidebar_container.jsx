import React from 'react'
import BuySharesFormInner from './share_dollar_container.jsx/share'

class SideBarContainer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            hasTicker: true,
            isBuyOrSell: "Buy",
            selectedShareOrDollar: "Shares",
        }

        this.buyButton = React.createRef()
        this.sellButton = React.createRef()

        // this.handleClickBuyButton = this.handleClickBuyButton.bind(this)
        // this.handleClickSellButton = this.handleClickSellButton.bind(this)
        // this.handleSubmitShareDollar = this.handleSubmitShareDollar.bind(this)
    }

    componentDidMount() {
        this.isBuyOrSell()
       
    }

    componentDidUpdate() {
        this.isBuyOrSell()
    }

    isBuyOrSell() {
        let buyButton = this.buyButton.current
        let sellButton = this.sellButton.current

        if (this.state.isBuyOrSell === "Buy") {
            buyButton.classList.add('greenHighlight')
            sellButton.classList.remove('greenHighlight')
        }

        if (this.state.isBuyOrSell === "Sell") {
            sellButton.classList.add('greenHighlight')
            buyButton.classList.remove('greenHighlight')
        }

    }

    handleSelectChange(e) {
        e.preventDefault()
        
        

    }


    // componentDidMount() {
    //     const that = this;
    //     this.props.fetchAllOrders().then(() => {
    //         if (that.props.tickerName.charAt(0).toLowerCase() + that.props.tickerName.slice(1) in that.props.userOrders) {
    //             that.setState({hasTicker: true})
    //         }
    //     })
    // }

    // componentDidUpdate(prevProps) {
    //     if (this.props.tickerName.charAt(0).toLowerCase() + this.props.tickerName.slice(1) in this.props.userOrders && prevProps !== this.props) {
    //         this.setState({hasTicker: true})
    //     }
    // }

    // handleClickBuyButton() {
    //     this.setState({
    //         buyButton: true
    //     })
    // }

    // handleClickSellButton() {
    //     this.setState({
    //         buyButton: false
    //     })
    // }

    // handleSubmitShareDollar() {

    // }

    // handleChangeSelect() {

    // }


    render() {
        // let sharesAvail;
        // let avgPrice;
        // if ( !(this.props.userOrders && Object.keys(this.props.userOrders).length === 0 && this.props.userOrders.constructor === Object) && this.props.userOrders[this.props.tickerName.charAt(0).toLowerCase() + this.props.tickerName.slice(1)]) {
        //     sharesAvail = this.props.userOrders[this.props.tickerName.charAt(0).toLowerCase() + this.props.tickerName.slice(1)].quantity
        //     avgPrice = this.props.userOrders[this.props.tickerName.charAt(0).toLowerCase() + this.props.tickerName.slice(1)].avgTickerPrice
        // }    
        let sellButton;
        if (this.state.hasTicker) sellButton = <button 
                                                    ref = {this.sellButton} 
                                                    onClick = {() => this.setState({isBuyOrSell: "Sell"})}
                                                    >Sell {this.props.tickerName}</button>

        return(
            <div className = "sidebar-ticker-container">
                <div className = "order-execution-container">
                    <div className = "outer-top-div-container">   
                        <div className = "buy-sell-buttons">
                            <button ref = {this.buyButton} 
                                    onClick = {() => this.setState({isBuyOrSell: "Buy"})}
                                    >Buy {this.props.tickerName}</button>
                            {sellButton}
                        </div>
                        <div className = "share-dollar-select">
                            <label>Invest In</label>
                            <select onChange = {this.handleSelectChange} value = {selectedShareOrDollar}>
                                <option value = "Shares">Shares</option>
                                <option value = "Dollars">Dollars</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>












            // <div className = "main-sidebar-container">
            //     <div className = "main-inner-sidebar-container">
            //         <div className = "sidebar-top-section">
            //             {this.state.hasTicker ? (
            //                 <div className = "sidebar-buyorsell-option">
            //                     <button className = "sidebar-buy-button-option"
            //                             onClick = {this.handleClickBuyButton} 
            //                         >Buy {this.props.tickerName}
            //                     </button>
            //                     <button className = "sidebar-sell-button-option"
            //                             onClick = {this.handleClickSellButton}
            //                         >Sell {this.props.tickerName}
            //                     </button>
            //                 </div>
            //             ) : (
            //                 <button className = "sidebar-buy-button-solo">Buy {this.props.tickerName}</button>
            //             )}
            //         </div>
            //         <div className = "sidebar-form-inner-container">
            //             <form onSubmit = {this.handleSubmitShareDollar} className = "invest-in-select-sharesordollars-inputform">
            //                 <label className = "invest-in-input-label">Invest In</label>
            //                 <select value = {this.state.selectedShareOrDollar} onChange = {this.handleChangeSelect} className = "invest-in-input-select">
            //                     <option className = "invest-in-options" value = "Shares">Shares</option>
            //                     <option className = "invest-in-options" value = "Dollars">Dollars</option>
            //                 </select>
            //             </form>
            //             {this.state.selectedShareOrDollar === "Shares" ? (
            //                 <BuySharesFormInner 
            //                     quantity = {sharesAvail}
            //                     markPrice = {this.props.markPrice} 
            //                     buyButton = {this.state.buyButton}
            //                     buyingPower = {this.props.currentUser.buyingPower}
            //                     id = {this.props.currentUser.id}
            //                     tickerName = {this.props.tickerName}
            //                     addOrder = {this.props.addOrder}
            //                     updateOrder = {this.props.updateOrder}
            //                     deleteOrder = {this.props.deleteOrder}
            //                     hasTicker = {this.state.hasTicker}
            //                     avgTickerPrice = {avgPrice}
            //                     userOrders = {this.props.userOrders}
            //                 />
            //             ) : (
            //                 <>
            //                     {/* add BuyDollarFormInner here */}
            //                 </>
            //             )}
            //             {this.state.buyButton ? (
            //                 <span className = "sidebar-form-bottom-availability">${this.props.currentUser.buyingPower.toFixed(2)} Buying Power Available</span>
            //             ) : (
            //                 <span className = "sidebar-form-bottom-availability">{sharesAvail} {this.props.tickerName} Shares Available</span>
            //             )}
            //         </div>
            //     </div>
            // </div>
        )
    }
}




export default SideBarContainer