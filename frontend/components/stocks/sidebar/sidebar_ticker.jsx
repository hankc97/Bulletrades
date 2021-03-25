import React from 'react'
import BuySharesFormInner from './share_or_dollar/share'

class SideBarTicker extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            hasTicker: false,
            selectedShareOrDollar: "Shares",
            buyButton: true,
            // sellButton: false, 
        }
    }

    handleClickBuyButton() {

    }

    handleClickSellButton() {

    }

    handleSubmit() {

    }

    handleChangeSelect() {

    }

    render() {
        
        return(
            <div className = "main-sidebar-container">
                <div className = "sidebar-top-section">
                    {this.state.hasTicker ? (
                        <div className = "sidebar-buyorsell-option">
                            <button className = "sidebar-buy-button-option"
                                    onClick = {this.handleClickBuyButton} 
                                >Buy {this.props.tickerName}
                            </button>
                            <button className = "sidebar-sell-button-option"
                                    onClick = {this.handleClickSellButton}
                                >Sell {this.props.tickerName}
                            </button>
                        </div>
                    ) : (
                        <button className = "sidebar-buy-button-solo">Buy {this.props.tickerName}</button>
                    )}
                </div>
                <div className = "sidebar-form-inner-container">
                    <form onSubmit = {this.handleSubmit} className = "invest-in-select-sharesordollars-inputform">
                        <label>Invest In</label>
                        <select value = {this.state.selectedShareOrDollar} onChange = {this.handleChangeSelect}>
                            <option value = "Shares">Shares</option>
                            <option value = "Dollars">Dollars</option>
                        </select>
                    </form>
                    {this.state.selectedShareOrDollar === "Shares" ? (
                        <BuySharesFormInner markPrice = {this.props.markPrice}/>
                    ) : (
                        <></>
                    )}
                </div>
                <div className = "sidebar-form-bottom-availability">
                    {this.state.buyButton ? (
                        <span className = "sidebar-form-bottom-availability-buy">${this.props.currentUser.buyingPower} Buying Power Available</span>
                    ) : (
                        <span className = "sidebar-form-bottom-availability-sell">{this.props.tickerName} Shares Available</span>
                    )}
                </div>
            </div>
        )
    }
}




export default SideBarTicker